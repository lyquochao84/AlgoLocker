import { useState } from "react";
import styles from "./dashboard-no-task.module.css";
import Modal from "../../modal/page";

const DashBoardNoTask: React.FC = () => {
  const [openModal, setOpenModal] = useState<Boolean>(false);

  const toggleModalHandler = () => {
    setOpenModal(!openModal);
  }

  return (
    <>
      <div className={styles.dashboard_welcome_message}>
        <h2 className={styles.dashboard_welcome_message_text_header}>
          AlgoLocker
        </h2>
        <h3 className={styles.dashboard_welcome_message_text_body}>
          Start saving your coding triumphs and unleashing your algorithmic potential
        </h3>
        <button className={styles.create_solution_btn} onClick={toggleModalHandler}>
          <p>Create Solution</p>
        </button>
        {openModal && <Modal onClose={toggleModalHandler}/>}
      </div>
    </>
  );
};


export default DashBoardNoTask;
