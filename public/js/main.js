document.addEventListener('DOMContentLoaded', () => {
  // Confirm before deleting a todo
  const deleteForms = document.querySelectorAll('form[action^="/todos/"][action$="DELETE"]');
  
  deleteForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      if (!confirm('Are you sure you want to delete this task?')) {
        e.preventDefault();
      }
    });
  });

  // Add subtle hover effect to buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
    });
  });

  // Simple form validation
  const todoForm = document.querySelector('.todo-form');
  if (todoForm) {
    todoForm.addEventListener('submit', (e) => {
      const titleInput = document.getElementById('title');
      if (!titleInput.value.trim()) {
        e.preventDefault();
        titleInput.classList.add('invalid');
        alert('Please enter a task title');
      }
    });
  }
});