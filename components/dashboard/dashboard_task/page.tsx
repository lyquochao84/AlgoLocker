/* 
    NOTE: 11 items in one column
    - Require 3 and half column
*/

import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { Solution } from "@/types/solution";

import styles from "./dashboard-task.module.css";
import { RiArrowDropDownLine } from "react-icons/ri";

const DashBoardTask: React.FC = () => {
  const { user } = useAuth();
  const userId = user.uid;
  const [solution, setSolution] = useState<Solution | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
      }
      catch(error: any) {

      }
    }
  }, [userId]);

  return (
    <div className={styles.topic_tasks}>
      <div className={styles.column}>
        <div className={styles.topic_task_wrapper}>
          <p className={styles.topic_task_header}>Array</p>
          <RiArrowDropDownLine className={styles.topic_task_icon} />
        </div>
      </div>
    </div>
  );
};

export default DashBoardTask;
