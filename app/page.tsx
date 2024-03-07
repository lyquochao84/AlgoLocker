"use client";

import Link from "next/link";

import styles from "./homepage.module.css";

const HomePage: React.FC = () => {
  return (
    <div className={styles.homepage_text_wrapper}>
      <h2 className={styles.homepage_text_header}>Welcome To AlgoLocker</h2>
      <h3 className={styles.homepage_text_body}>
        The diary of all programmers
      </h3>
      <Link href="/sign-up" className={styles.homepage_signup_link}>
        <button className={styles.homepage_signup_btn}>Create account</button>
      </Link>
    </div>
  );
};

export default HomePage;
