import { FaFilter } from "react-icons/fa";
import styles from './search.module.css';

export function Search({onSearch, onFilter, selected}){
    return (
        <section className={styles.search}>
                <FaFilter className={styles.miImg} />
                <input type="text"  placeholder="Search" onChange={onSearch}/>
                <select value={selected} onChange={onFilter}>
                    <option value="all" selected>All</option>
                    <option value="todo">ToDo</option>
                    <option value="progress">In Progress</option>
                    <option value="done">Completed</option>
                </select>
        </section>
    );
}