"use client";
import React, { Fragment } from "react";
import Image from "next/image";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import styles from "./header.module.css";

import { FaRegUserCircle } from "react-icons/fa";
import logo from "@/assets/Logo.png";

const Header: React.FC = () => {
  const { user, logOut } = useAuth();
  const router = useRouter();

  return (
    <header className={styles.header}>
      <Link href={user ? `/dashboard` : `/`}>
        <Image
          src={logo}
          alt="logo"
          width={150}
          height={100}
          className={styles.logo}
        />{" "}
      </Link>
      {user && user.displayName ? (
        <>
          <div className={styles.user_login_wrapper}>
            <FaRegUserCircle className={styles.user_login_icon} />
            <h3 className={styles.user_login_text}>{user.displayName}</h3>
            <button
              className={styles.log_out_btn}
              onClick={() => {
                logOut();
                router.push("/");
              }}
            >
              Log Out
            </button>
          </div>
        </>
      ) : (
        <Link href="/sign-in">
          <div className={styles.user_login_wrapper}>
            <FaRegUserCircle className={styles.user_login_icon} />
            <h3 className={styles.user_login_text}>Log In</h3>
          </div>
        </Link>
      )}
    </header>
  );
};

export default Header;
