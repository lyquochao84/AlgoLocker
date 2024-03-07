import styles from './search-bar.module.css';

import { IoSearch } from "react-icons/io5";


const SearchBar: React.FC = () => {
    return (
        <div className={styles.search_box}>
            <div className={styles.search}>
                <div className={styles.text_and_icon}>
                    <input type="text" className={styles.search_text} placeholder="Search by Company, Keyword or the designation .." />
                    <IoSearch className={styles.search_icon}/>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;