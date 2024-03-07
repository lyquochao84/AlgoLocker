import Link from "next/link";

import styles from "./close-side-bar.module.css";

import { HiBars3 } from "react-icons/hi2";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

interface CloseSideBarProps {
  onOpen: () => void;
  onWarning: () => void;
}

const CloseSideBar: React.FC<CloseSideBarProps> = ({ onOpen }) => {
 
  return (
    <div className={styles.sidebar}>
      <HiBars3 className={styles.sidebar_bar_icon}  onClick={onOpen} />
      <div className={styles.sidebar_social_media_wrapper}>
        <Link
          href="mailto:algolocker@gmail.com"
          className={styles.sidebar_social_media_link}
        >
          <MdEmail className={styles.sidebar_icon} />
        </Link>
        <Link
          href="https://www.linkedin.com/in/hao-ly-8124b5197/"
          className={styles.sidebar_social_media_link}
        >
          <FaLinkedin className={styles.sidebar_icon} />
        </Link>
        <Link
          href="https://github.com/lyquochao84?tab=repositories"
          className={styles.sidebar_social_media_link}
        >
          <FaGithub className={styles.sidebar_icon} />
        </Link>
      </div>
    </div>
  );
};

export default CloseSideBar;
