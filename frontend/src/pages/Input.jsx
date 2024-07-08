import { useEffect, useState} from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
// import { ThemeContext } from "../ThemeContext";


function Input({ setTasks, currentTask, clearCurrentTask }) {
  const [task, setTask] = useState('')
  const [dueDate, setDueDate] = useState('')
  
  const taskSuggestions = ['Write an essay', 'Arrange documents', 'Speak to clients', 'Set up a meeting']


  useEffect(() => {
    if (currentTask) {
      setTask(currentTask.task)
      setDueDate(currentTask.dueDate ? new Date(currentTask.dueDate).toISOString().split('T')[0] : '');
    }
  }, [currentTask])

  const addOrUpdate = () => {
    if (task === '' || dueDate === '') {
      toast.error('Please add a task and a due date!');
    } else {
      if (currentTask) {
        axios.put(`http://localhost:3002/update-name/${currentTask._id}`, { taskName: task, dueDate })
          .then(result => {
            setTasks(prevTasks => prevTasks.map(t => t._id === currentTask._id ? result.data : t));
            setTask('');
            setDueDate('');
            clearCurrentTask();
            toast.success('Task Updated!');
          })
        .catch(err => console.log(err));
      } else {
        axios.post('http://localhost:3002/add', { task, dueDate })
          .then(result => {
            setTasks(prevTasks => [...prevTasks, result.data]);
            setTask(''); 
            setDueDate('');
            toast.success('Task Created!')
          })
          .catch(err => console.log(err));
          
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
      onChange={(e) => setTask(e.target.value)} />

      <datalist id="taskSuggestions">
        {taskSuggestions.map((suggestion, index) => (
          <option key={index} value={suggestion} />
        ))}
      </datalist>


      <input 
        type="date" 
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)} 
      />

      <button type="button" onClick={addOrUpdate}>
      {currentTask ? 'Update' : 'Add'}
      </button>

    </div>
  )
}
export default Input