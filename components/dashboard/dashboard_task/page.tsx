import styles from './dashboard-task.module.css';
import { RiArrowDropDownLine } from "react-icons/ri";

const DashBoardTask: React.FC = () => {
    return (
        <div className={styles.topic_tasks}>
            <div className={styles.topic_task_wrapper}>
                <p className={styles.topic_task_header}>Array</p>
                <RiArrowDropDownLine className={styles.topic_task_icon}/>
            </div>
        </div>
    )
};

export default DashBoardTask;