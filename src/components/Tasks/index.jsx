import styles from './tasks.module.css';
import {Task} from './../Task/index'
import {Search} from './../Search/index'

//importanciones para axios
import { useEffect, useState } from 'react';
import axios from 'axios';

const baseURL = 'http://localhost:3000/api/v1/tasks';

// eslint-disable-next-line react/prop-types
export function Tasks({tareas,getTasks, tasks,selected,word, onFilter,onSearch, oneComplete, onDelete}){
    const taskQuantity = tasks.length;
    const todoTasks = tasks.filter(task=> task.isCompleted=== 'todo').length;
    const completedTasks = tasks.filter(task=>task.isCompleted === 'done').length
    const progressTasks = tasks.filter(task => task.isCompleted === 'progress').length

    const searchValidator = (title) =>{
        //not tildes
        const notTildes = (tit)=> tit.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        // normalice text to lower case
        const taskTextLC = notTildes(title.toLowerCase());
        const searchTextLC = notTildes(word.toLowerCase());

        return taskTextLC.includes(searchTextLC);
    }

    // const [tareas, setTask] = useState([]);
    

    return (
        <section className={styles.tasks}>
            <header className={styles.header}>
                <div>
                    <p>To Do</p>
                    <span>{todoTasks}</span>
                </div>
                <div>
                    <p className={styles.textProgress}>In progress</p>
                    <span>{progressTasks}</span>
                </div>
                <div>
                    <p className={styles.textPurple}>Completed</p>
                    <span>{completedTasks} of {taskQuantity}</span>
                </div>
            </header>
            <div>
                <Search selected={selected} onSearch={onSearch} onFilter={onFilter}/>
            </div>
            <div className={styles.list}>
                {
                    tareas.map(tarea => {
                        console.log(tarea);
                        if(selected === 'all'){
                            return <Task key={tarea.id} tarea={tarea} />
                        }else if(selected === tarea.iscompleted){
                            return <Task key={tarea.id} tarea={tarea} />
                        }
                        
                    })
                }
                {/* {
                    tareas.map((tarea)=>(
                        <div>
                            <h1>{tarea.title}</h1>
                            <p>{tarea.description}</p>
                            <p>{tarea.date}</p>
                            <p>{tarea.iscompleted}</p>
                        </div>
                    ))
                    
                } */}
            </div>
        </section>
    );

    // return(
    //     <section className={styles.tasks}>
    //         <header className={styles.header}>
    //             <div>
    //                 <p>To Do</p>
    //                 <span>{todoTasks}</span>
    //             </div>
    //             <div>
    //                 <p className={styles.textProgress}>In progress</p>
    //                 <span>{progressTasks}</span>
    //             </div>
    //             <div>
    //                 <p className={styles.textPurple}>Completed</p>
    //                 <span>{completedTasks} of {taskQuantity}</span>
    //             </div>
    //         </header>
    //         <div>
    //             <Search selected={selected} onSearch={onSearch} onFilter={onFilter}/>
    //         </div>
    //         <div className={styles.list}>
    //             {
    //             tasks.map(task => {
    //                 if(selected === 'all'){
    //                     return searchValidator(task.title) ? <Task key={task.id} task={task} oneComplete={oneComplete} onDelete={onDelete}/>: ""
    //                 }else if(selected === task.isCompleted){
    //                     return searchValidator(task.title) ? <Task key={task.id} task={task} oneComplete={oneComplete} onDelete={onDelete}/>: ""
    //                 }
    //             })
    //         }
    //         </div>
    //     </section>
    // );
}