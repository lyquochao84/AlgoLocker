"use client";
import React from "react";
import Image from "next/image";
import Modal from "@/components/modal/page";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import styles from "./header.module.css";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";

import logo from "@/assets/Logo.png";

const Header: React.FC = () => {
  const [openModal, setOpenModal] = useState<Boolean>(false);
  const { user, logOut } = useAuth();
  const router = useRouter();

  const toggleModalHandler = () => {
    setOpenModal(!openModal);
  }

  return (
   <>
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
            <div className={styles.header_user_add_wrapper}>
              <IoMdAddCircleOutline className={styles.header_btn_icon} onClick={toggleModalHandler}/>
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
      {openModal && <Modal  onClose={toggleModalHandler}/>}
   </>
  );
};

export default Header;
