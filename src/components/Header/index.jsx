import styles from './header.module.css'
import todoLogo from '../../../public/vite.svg'
import { useState } from 'react';

export function Header({onAddTask}){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

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
    return (
        <header className={styles.header}>
            <img src={todoLogo} alt="logo" />
            <p>Obed's ToDo App</p>

            <form onSubmit={handleSubmit} className={styles.newTaskForm}>
                <input type="text" placeholder='Titulo' value={title} onChange={onChangeTitle} />
                <input type="text" placeholder='Descripción de la tarea' value={description} onChange={onChangeDesc}/>
                <input type="date" name="date" id="date" value={date} onChange={onChangeDate}/>
                <button>Agregar</button>
            </form>
        </header>
    );
}