import styles from './task.module.css'
import {TbTrash} from 'react-icons/tb'
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { FaEdit } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
// import { useEffect, useState } from 'react';
// import axios from 'axios';


export function Task({tarea, task, oneComplete, onDelete}){

    return (
        <div className={styles.task}>
            <button className={styles.checkContainer} onClick={()=> oneComplete(task.id)}>
                {tarea.iscompleted === 'progress'? <div className={styles.checkProgress}/>: tarea.iscompleted === 'done'? <BsFillCheckCircleFill/> : <div/> }
            </button>
            <div>
                <div>
                    <span className={tarea.iscompleted == 'progress' ?styles.textProgress: tarea.iscompleted=='done'?styles.textCompleted:""}>{tarea.title} - </span>
                    <span className={tarea.iscompleted == 'progress' ?styles.textProgress: tarea.iscompleted=='done'?styles.textCompleted:""}>{tarea.description}</span>
                </div>
                {/* <span>Date: 26/24/2020</span>
                <span>State: ToTo</span> */}
                <div className={styles.dateTodo}>
                    <FaCalendarAlt />
                    <span>{tarea.date}</span>
                </div>
            </div>
            <div>
                <button className={styles.editButton}>
                        <FaEdit size={20} />
                </button>
                <button className={styles.deleteButton} onClick={()=> onDelete(task.id)}>
                        <TbTrash size={20} />
                </button>
            </div>
        </div>
    );
    // return (
    //     <div className={styles.task}>
    //         <button className={styles.checkContainer} onClick={()=> oneComplete(task.id)}>
    //             {task.isCompleted === 'progress'? <div className={styles.checkProgress}/>: task.isCompleted === 'done'? <BsFillCheckCircleFill/> : <div/> }
    //         </button>
    //         <div>
    //             <div>
    //                 <span className={task.isCompleted === 'progress' ?styles.textProgress: task.isCompleted=='done'?styles.textCompleted:""}>{task.title} - </span>
    //                 <span className={task.isCompleted === 'progress' ?styles.textProgress: task.isCompleted=='done'?styles.textCompleted:""}>{task.description}</span>
    //             </div>
    //             {/* <span>Date: 26/24/2020</span>
    //             <span>State: ToTo</span> */}
    //             <div className={styles.dateTodo}>
    //                 <FaCalendarAlt />
    //                 <span>{task.date}</span>
    //             </div>
    //         </div>
    //         <div>
    //             <button className={styles.editButton}>
    //                 <FaEdit size={20} />
    //             </button>
    //             <button className={styles.deleteButton} onClick={()=> onDelete(task.id)}>
    //                 <TbTrash size={20} />
    //             </button>
    //         </div>
    //     </div>
    // );
}