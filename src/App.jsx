import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

// imports
import {Header} from "./components/Header"
import {Tasks} from "./components/Tasks"
import {Footer} from "./components/Footer"

const LOCAL_STORAGE_KEY = "todo:savedtasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [selected, setSelected] = useState('all');
  const [word, setWord] = useState('');

  const loadSavedTasks= ()=>{
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setTasks(JSON.parse(saved))
    }
  }

  useEffect(()=> {
    loadSavedTasks();
  },[])

  const setTasksAndSave = (newTasks) =>{
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  const filterTodos = (search)=>{
    console.log(search.target.value);
    const filter = search.target.value;
    setSelected(filter);
  }

  const searchTodos = (search)=>{
    console.log(search.target.value);
    const word = search.target.value;
    setWord(word);
  }

  //add new task in the state
  const addTask = (taskTitle, taskDesc, taskDate) =>{
    setTasksAndSave([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: taskTitle,
        description: taskDesc,
        date:taskDate,
        isCompleted: 'todo'
      }
    ])
  }



  // change task status
  const toggleTaskCompletedById = (taskId) =>{
    const newTasks = tasks.map(task =>{
      if (task.id === taskId) {
        let statu='todo';
        if(task.isCompleted === 'todo'){
          statu = 'progress';
        }else if(task.isCompleted === 'progress') {
          statu = 'done';
        } else {
          statu = 'todo'
        }
        return {
          ...task,
          isCompleted: statu
        }
      }
      return task;
    });
    setTasksAndSave(newTasks);
  }
  // delete - or ommit especifid task in the state
  const deleteTaskById = (taskId) =>{
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasksAndSave(newTasks);
  }

 

  return (
    <>
      <Header onAddTask={addTask}/>
      <Tasks 
        tasks={tasks} 
        selected={selected}
        word={word}
        onFilter={filterTodos}
        onSearch={searchTodos}
        onDelete={deleteTaskById}
        oneComplete={toggleTaskCompletedById}
      />
      <Footer/>
    </> 
  )
}

export default App
