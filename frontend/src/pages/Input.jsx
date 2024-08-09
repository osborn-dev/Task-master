// Import necessary hooks and libraries from React and axios for HTTP requests, and toast for notifications
import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

function Input({ setTasks, currentTask, clearCurrentTask }) {
  // State hooks to manage the task name and due date
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  
  // Array of task suggestions for the datalist
  const taskSuggestions = ['Write an essay', 'Arrange documents', 'Speak to clients', 'Set up a meeting'];

  // useEffect hook to populate input fields when editing a task
  useEffect(() => {
    if (currentTask) {
      setTask(currentTask.task); // Set task state to the current task's name
      setDueDate(currentTask.dueDate ? new Date(currentTask.dueDate).toISOString().split('T')[0] : ''); // Set dueDate state to the current task's due date in YYYY-MM-DD format
    }
  }, [currentTask]); // Dependency array includes currentTask, so the effect runs when currentTask changes

  // Function to add or update a task
  const addOrUpdate = () => {
    if (task === '' || dueDate === '') {
      toast.error('Please add a task and a due date!'); // Show error toast if task or due date is empty
    } else {
      if (currentTask) {
        // Update an existing task
        axios.put(`http://localhost:3002/api/todos/update-name/${currentTask._id}`, { taskName: task, dueDate })
          .then(result => {
            setTasks(prevTasks => prevTasks.map(t => t._id === currentTask._id ? result.data : t)); // Update the task in the tasks state
            setTask(''); // Clear the task input field
            setDueDate(''); // Clear the due date input field
            clearCurrentTask(); // Clear the currentTask state
            toast.success('Task Updated!'); // Show success toast
          })
          
          .catch(err => console.log(err)); // Handle errors
          
      } else {
        // Add a new task
        axios.post('http://localhost:3002/api/todos/add', { task, dueDate })
          .then(result => {
            setTasks(prevTasks => [...prevTasks, result.data]); // Add the new task to the tasks state
            setTask(''); // Clear the task input field
            setDueDate(''); // Clear the due date input field
            toast.success('Task Created!'); // Show success toast
          })
          .catch(err => console.log(err)); // Handle errors
      }
    }
  };

  return (
    <div className="create_form">
      <input 
        type="text" 
        value={task}
        list="taskSuggestions"
        placeholder="Add a task"
        onChange={(e) => setTask(e.target.value)} // Update the task state when the input value changes
      />

      <datalist id="taskSuggestions">
        {taskSuggestions.map((suggestion, index) => (
          <option key={index} value={suggestion} /> // Render task suggestions
        ))}
      </datalist>

      <input 
        type="date" 
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)} // Update the due date state when the input value changes
      />

      <button type="button" onClick={addOrUpdate}>
      {/* Change button text based on whether a task is being edited or added */}
        {currentTask ? 'Update' : 'Add'} 
      </button>
    </div>
  );
}

export default Input;
