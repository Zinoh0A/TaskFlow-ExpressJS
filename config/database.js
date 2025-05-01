const mongoose = require('mongoose');

// MongoDB connection string from environment variables
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/todo_app';

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;