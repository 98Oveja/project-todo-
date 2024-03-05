import styles from './header.module.css'
import todoLogo from '../../../public/vite.svg'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const baseURL = 'http://localhost:3000/api/v1/tasks';

export function Header({onAddTask, getTasks}){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    // const redirect =useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        onAddTask(title, description, date);
        setTitle('');
        setDescription('');
        setDate('');
    }
    function onChangeTitle(event){
        setTitle(event.target.value);
    }
    function onChangeDesc(event){
        setDescription(event.target.value);
    }
    function onChangeDate(event){
        const date = event.target.value;
        setDate(date);
    }

    const store = async (e) =>{
        e.preventDefault();
        await axios.post(baseURL, {title:title, description:description, date:date, isCompleted:'todo'});
        // window.location.reload();
        getTasks()
        setTitle('');
        setDescription('');
        setDate('');
        // redirect('/');
    }

    return (
        <header className={styles.header}>
            <img src={todoLogo} alt="logo" />
            <p>ToDo App - VoxDataComm</p>
            <form onSubmit={store} className={styles.newTaskForm}>
                <input type="text" placeholder='Titulo' value={title} onChange={onChangeTitle} id='title' />
                <input type="text" placeholder='Descripción de la tarea' value={description} onChange={onChangeDesc} id='description'/>
                <input type="date" name="date" value={date} onChange={onChangeDate} id='date'/>
                <button>Agregar</button> 
            </form>
        </header>
    );

    return (
        <header className={styles.header}>
            <img src={todoLogo} alt="logo" />
            <p>ToDo App - VoxDataComm</p>

            <form onSubmit={handleSubmit} className={styles.newTaskForm}>
                <input type="text" placeholder='Titulo' value={title} onChange={onChangeTitle} />
                <input type="text" placeholder='Descripción de la tarea' value={description} onChange={onChangeDesc}/>
                <input type="date" name="date" id="date" value={date} onChange={onChangeDate}/>
                <button>Agregar</button>
            </form>
        </header>
    );
}