const express = require('express');
const router = express.Router();
const {
  getTodos,
  addTodo,
  updateTodo,
  updateTodoName,
  deleteTodo,
} = require('../controllers/todoController');
const {protect} = require('../middleware/authMiddleware')

// Route to get all todos
router.route('/').get(getTodos);

// Route to add a new todo
router.route('/add').post(addTodo);

// Route to update a todo's done status
router.route('/update/:id').put(updateTodo);

// Route to update a todo's name and due date
router.route('/update-name/:id').put(updateTodoName);

// Route to delete a todo
router.route('/delete/:id').delete(deleteTodo);

module.exports = router;
