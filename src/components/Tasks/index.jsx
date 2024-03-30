import styles from './tasks.module.css';
import {Task} from './../Task/index'
import {Search} from './../Search/index'

// eslint-disable-next-line react/prop-types
export function Tasks({tasks,selected,word, onFilter,onSearch, oneComplete, onDelete}){
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

    return(
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
                <p>Total: {taskQuantity} tasks</p>
            </div>
            <div>
                <Search selected={selected} onSearch={onSearch} onFilter={onFilter}/>
            </div>
            <div className={styles.list}>
                {
                tasks.map(task => {
                    if(selected === 'all'){
                        return searchValidator(task.title) ? <Task key={task.id} task={task} oneComplete={oneComplete} onDelete={onDelete}/>: ""
                    }else if(selected === task.isCompleted){
                        return searchValidator(task.title) ? <Task key={task.id} task={task} oneComplete={oneComplete} onDelete={onDelete}/>: ""
                    }
                })
            }
            </div>
        </section>
    );
}