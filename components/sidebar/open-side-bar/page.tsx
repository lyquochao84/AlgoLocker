import SearchBar from '../search-bar/page';

import { OpenSideBarProps } from '@/types/sidebar';

import styles from './open-side-bar.module.css';
import { IoIosCloseCircleOutline } from "react-icons/io";

const OpenSideBar: React.FC<OpenSideBarProps> = ({ onClose }) => {
    return (
        <div className={styles.sidebar}>
            <IoIosCloseCircleOutline className={styles.close_icon} onClick={onClose} />
            <SearchBar />
        </div>
    );
}

export default OpenSideBar;