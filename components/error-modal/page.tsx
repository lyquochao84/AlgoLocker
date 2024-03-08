import styles from "./error-modal.module.css";

import { IoCloseCircleOutline } from "react-icons/io5";

interface ErrorMessages {
    message: string;
    onClose: () => void;
};

const ErrorModal: React.FC<ErrorMessages> = ({ message, onClose }) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.error_modal}>
        <div className={styles.error_modal_header}>
          <h3 className={styles.error_modal_header_text}>NOTICE</h3>
          <IoCloseCircleOutline className={styles.modalCloseIcon} onClick={onClose} />
        </div>
        <p className={styles.error_message}>{message}</p>
      </div>
    </div>
  );
};

export default ErrorModal;
