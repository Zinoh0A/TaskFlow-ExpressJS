const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET: Home page with form to add new todo
router.get('/', (req, res) => {
  res.render('index');
});

// GET: All todos
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.render('todos', { todos });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// POST: Create new todo
router.post('/todos', async (req, res) => {
  try {
    const { title, description } = req.body;
    
    const newTodo = new Todo({
      title,
      description
    });
    
    await newTodo.save();
    res.redirect('/todos');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// PUT: Update todo (toggle completion status)
router.put('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    // Toggle the completed status
    todo.completed = !todo.completed;
    
    await todo.save();
    res.redirect('/todos');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// DELETE: Delete todo
router.delete('/todos/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.redirect('/todos');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

// GET: Show edit form for a specific todo
router.get('/todos/:id/edit', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).send('Todo not found');
    }
    res.render('edit', { todo });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// PATCH: Update a todo's content
router.patch('/todos/:id', async (req, res) => {
  try {
    const { title, description } = req.body;
    
    await Todo.findByIdAndUpdate(req.params.id, {
      title,
      description
    });
    
    res.redirect('/todos');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});