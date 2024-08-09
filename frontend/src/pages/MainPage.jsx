// Import necessary hooks and components from React, axios for HTTP requests, icons for UI, toast for notifications, and Spinner for loading indication
import { useEffect, useState } from "react";
import Input from "./Input";
import axios from 'axios';
import { TiDelete, TiEdit } from "react-icons/ti";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

function MainPage() {
  // State hooks to manage tasks, the task being edited, and the loading status
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get the token from local storage
  // const token = localStorage.getItem('token');

  // useEffect hook to fetch tasks when the component mounts
  useEffect(() => {
    axios.get('http://localhost:3002/api/todos')
      .then(result => {
        setTasks(result.data); // Update tasks state with fetched data
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(err => {
        console.error(err);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []); // Dependency array includes token, so the effect runs when token changes

  // Function to toggle the done status of a task
  const toggleTask = (id) => {
    setLoading(true); // Set loading to true while the request is being made
    axios.put(`http://localhost:3002/api/todos/update/${id}`)
      .then(result => {
        setTasks(result.data); // Update tasks state with the modified task
        setLoading(false); // Set loading to false after request completes
      })
      .catch(err => {
        console.error(err);
        setLoading(false); // Set loading to false even if there's an error
      });
  };

  // Function to delete a task
  const deleteTask = (id) => {
    setLoading(true); // Set loading to true while the request is being made
    axios.delete(`http://localhost:3002/api/todos/delete/${id}`)
      .then(() => {
        setTasks(prevTasks => prevTasks.filter(task => task._id !== id)); // Update tasks state by removing the deleted task
        toast.success('Task Deleted'); // Show success notification
        setLoading(false); // Set loading to false after request completes
      })
      .catch(err => {
        console.error(err);
        setLoading(false); // Set loading to false even if there's an error
      });
  };

  // Function to handle editing a task
  const handleEdit = (task) => {
    setCurrentTask(task); // Set currentTask state to the task being edited
  };

  // Function to clear the current task being edited
  const clearCurrentTask = () => {
    setCurrentTask(null); // Clear the currentTask state
  };

  // Function to check if a task is overdue
  const isOverdue = (dueDate) => {
    if (!dueDate) return false; // If no due date, it's not overdue
    const currentDate = new Date();
    const taskDate = new Date(dueDate);
    return taskDate < currentDate && !tasks.done; // Check if the due date is in the past and the task is not done
  };

  return (
    <div className="home">
      <h2>𝐓𝐚𝐬𝐤 𝐋𝐢𝐬𝐭</h2>
      <Input setTasks={setTasks} currentTask={currentTask} clearCurrentTask={clearCurrentTask} />
      {
        loading ? <Spinner /> : ( // Show spinner while loading
          <div className="task-wrapper">
            {
              tasks.length === 0
                ? <div className="center"><h3>No Record</h3></div> // Show message if no tasks
                : tasks.map(task => ( // Map over tasks and display each task
                  <div className={`task ${task.done ? 'completed' : ''} ${isOverdue(task.dueDate) ? 'overdue' : ''}`} key={task._id}>
                    <div className="checkbox" onClick={() => toggleTask(task._id)}>
                      {task.done ? <RiCheckboxCircleFill className="icons" /> : <MdCheckBoxOutlineBlank className="icons" />}
                      <p>{task.task}</p>
                      {task.dueDate && <p className="due-date">Due: {new Date(task.dueDate).toLocaleDateString()}</p>}
                    </div>
                    <div>
                      <span onClick={() => deleteTask(task._id)}><TiDelete className="icon" /></span>
                      <span onClick={() => handleEdit(task)}><TiEdit className="icon" /></span>
                    </div>
                  </div>
                ))
            }
          </div>
        )
      }
    </div>
  );
}

export default MainPage;
