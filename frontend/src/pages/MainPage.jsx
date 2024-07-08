import { useEffect, useState } from "react";
import Input from "./Input";
import axios from 'axios'
import { TiDelete, TiEdit } from "react-icons/ti";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";


function MainPage() { 
  const [tasks, setTasks] = useState([])
  const [currentTask, setCurrentTask] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:3002/get')
      .then(result => {
        setTasks(result.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(err => {
        console.error(err);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  const toggleTask = (id) => {
    setLoading(true);
    axios.put(`http://localhost:3002/update/${id}`)
      .then(result => {
        setTasks(result.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

 const deleteTask = (id) => {
    setLoading(true);
    axios.delete(`http://localhost:3002/delete/${id}`)
      .then(() => {
        setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
        toast.success('Task Deleted');
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const  handleEdit = (task) => {
    setCurrentTask(task)
  }

  const clearCurrentTask = () => {
    setCurrentTask(null)
  }
  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    const currentDate = new Date();
    const taskDate = new Date(dueDate);
    return taskDate < currentDate && !tasks.done; // Ensures the task is overdue and not completed
  };



  return (
    <div className="home">
      <h2>𝐓𝐚𝐬𝐤 𝐋𝐢𝐬𝐭</h2>
      <Input setTasks={setTasks} currentTask={currentTask} clearCurrentTask={clearCurrentTask} />
      {
        loading ? <Spinner /> : (
          <div className="task-wrapper">
        {
          tasks.length === 0
           ? <div className="center"><h3>No Record</h3></div> 
           :
          tasks.map(task => (
            <div className={`task ${task.done ? 'completed' : ''} ${isOverdue(task.dueDate) ? 'overdue' : ''}`}  key={task._id}>
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
  )
}
export default MainPage