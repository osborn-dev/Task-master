// Import necessary modules
const asyncHandler = require('express-async-handler'); // Middleware to handle exceptions in async route handlers
const Todo = require('../models/Todo'); // Import the Todo model
const User = require('../models/userModel'); // Import the User model

// Function to get all todos
const getTodos = async (req, res) => {
    Todo.find() // Find all todo items
    .then(result => res.json(result)) // If successful, send the results as JSON response
    .catch(err => res.json(err)); // If there's an error, send the error as JSON response
}

// Function to add a new todo
const addTodo = (req, res) => {
  const {task, dueDate} = req.body; // Destructure task and dueDate from request body
  Todo.create({ task, dueDate }) // Create a new todo item with the provided task and dueDate
      .then(result => res.json(result)) // If successful, send the created todo item as JSON response
      .catch(err => res.status(500).json(err)); // If there's an error, send a 500 status with the error
}

// Function to update the status (done/not done) of a todo
const updateTodo = async (req, res) => {
  const { id } = req.params; // Get the id from request parameters
  try {
      const task = await Todo.findById(id); // Find the todo item by id
      task.done = !task.done; // Toggle the done status
      await task.save(); // Save the updated todo item
      
      const tasks = await Todo.find({}); // Get all todo items
      res.json(tasks); // Send all todo items as JSON response
  } catch (err) {
      res.status(500).json(err); // If there's an error, send a 500 status with the error
  }
}

// Function to update the name and due date of a todo
const updateTodoName = async (req, res) => {
  const { id } = req.params; // Get the id from request parameters
  const { taskName, dueDate } = req.body; // Destructure taskName and dueDate from request body
  try {
      // Find the todo item by id and update the task and dueDate fields
      const task = await Todo.findByIdAndUpdate(id, { task: taskName, dueDate }, { new: true });
      res.json(task); // Send the updated todo item as JSON response
  } catch (err) {
      res.status(500).json(err); // If there's an error, send a 500 status with the error
  }
}

// Function to delete a todo
const deleteTodo = (req, res) => {
  const { id } = req.params; // Get the id from request parameters
  Todo.findByIdAndDelete(id) // Find and delete the todo item by id
      .then(result => {
          if (result) {
              res.json({ message: 'Task deleted successfully', result }); // If successful, send a success message and the deleted item
          } else {
              res.status(404).json({ message: 'Task not found' }); // If the todo item was not found, send a 404 status with a not found message
          }
      })
      .catch(err => res.status(500).json({ message: 'Error deleting task', error: err })); // If there's an error, send a 500 status with the error
}

// Export all the functions to be used in other parts of the application
module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  updateTodoName,
  deleteTodo,
}
