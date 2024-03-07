"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { auth, githubProvider, googleProvider } from "@/config/db";

import styles from "./sign-in.module.css";

import { FiUser } from "react-icons/fi";
import { IoLockClosedOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
import { signInWithPopup } from "firebase/auth";

interface LoginType {
  email: string;
  password: string;
  rememberMe: boolean;
}

const SignInPage: React.FC = () => {
  const [userData, setUserData] = useState<LoginType>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const { logIn } = useAuth();

  // Remember Me: Using local storage to get the saved email, and password on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    const storedPassword = localStorage.getItem("rememberedPassword");

    if (storedEmail && storedPassword) {
      setUserData({
        ...userData,
        email: storedEmail,
        password: storedPassword,
        rememberMe: true,
      });
    }
  }, []);

  const logInHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await logIn(userData.email, userData.password);
      // Save to local storage if remember me is checked
      if (userData.rememberMe) {
        localStorage.setItem("rememberedEmail", userData.email);
        localStorage.setItem("rememberedPassword", userData.password);
      } else {
        // Clear saved email and password if "Remember Me" is unchecked
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
      }
    } catch (error: any) {
      alert("Invalid Email or Password");
    }
  };

  // Sign In With Google
  const signInGoogleHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, googleProvider);
    } 
    catch (error: any) {
      alert("Google Sign-In Error! Please try different methods to sign in");
    }
  };

  // Sign In With Github
  const signInGithubHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, githubProvider);
    } 
    catch (error: any) {
      alert("Github Sign-In Error! Please try different methods to sign in");
    }
  };

  return (
    <form className={styles.log_in_form} onSubmit={logInHandler}>
      <h2 className={styles.log_in_header}>Log In</h2>
      <div className={styles.log_in_infos}>
        <div className={styles.log_in_row}>
          <label className={styles.log_in_label} htmlFor="email">
            <FiUser className={styles.log_in_icon} />
          </label>
          <input
            className={styles.log_in_input}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            autoComplete="off"
            required
            value={userData.email}
            onChange={(e: any) => {
              setUserData({
                ...userData,
                email: e.target.value,
              });
            }}
          />
        </div>
        <div className={styles.log_in_row}>
          <label className={styles.log_in_label} htmlFor="password">
            <IoLockClosedOutline className={styles.log_in_icon} />
          </label>
          <input
            className={styles.log_in_input}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            pattern=".{8,}"
            value={userData.password}
            required
            onChange={(e: any) => {
              setUserData({
                ...userData,
                password: e.target.value,
              });
            }}
          />
        </div>
      </div>
      <div className={styles.log_in_options}>
        <div className={styles.remember_me_wrapper}>
          <input
            className={styles.remember_me_checkbox}
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={userData.rememberMe}
            onChange={(e) =>
              setUserData({ ...userData, rememberMe: e.target.checked })
            }
          />
          <label className={styles.remember_me_label} htmlFor="rememberMe">
            Remember Me
          </label>
        </div>
        <Link href="/sign-up" className={styles.create_account_text}>
          Create an account
        </Link>
      </div>
      <button
        type="submit"
        className={
          !userData.email || !userData.password
            ? styles.log_in_button_disabled
            : styles.log_in_button
        }
      >
        Log In
      </button>
      <div className={styles.sign_in_more_options}>
        <button
          className={styles.sign_in_more_options_btn}
          type="submit"
          onClick={signInGoogleHandle}
        >
          <FcGoogle className={styles.sign_in_more_options_icon} />
        </button>
        <button
          className={styles.sign_in_more_options_btn}
          type="submit"
          onClick={signInGithubHandle}
        >
          <SiGithub className={styles.sign_in_more_options_icon} />
        </button>
      </div>
    </form>
  );
};

export default SignInPage;
