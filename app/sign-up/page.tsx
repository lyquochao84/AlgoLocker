"use client";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

import styles from "./sign-up.module.css";

import { MdOutlineMail } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";


interface RegistrationType {
  email: string;
  password: string;
  displayName: string;
}

const SignUpPage: React.FC = () => {
  const { signUp } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<RegistrationType>({
    email: "",
    password: "",
    displayName: ""
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>("");

  const validatePasswordCharacters = (password: string): boolean => {
    const isValid = password.length >= 8;
    setPasswordError(
      isValid ? null : "Password must have at least 8 characters"
    );
    return isValid;
  };
  
  const signUpHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signUp(data.email, data.password, data.displayName);
      router.push("/dashboard");
    } 
    catch (error: any) {
      alert("Email already exists, please try a different one!");
    }
  };

  // Destructure data from the data object
  const { ...allData } = data;

  // Disable submit button until all fields are filled in
  const canSubmit = [...Object.values(allData)].every(Boolean);

  return (
    <form className={styles.sign_up_form} onSubmit={signUpHandler}>
      <h2 className={styles.sign_up_header}>Sign Up</h2>
      <div className={styles.sign_up_infos}>
        <div className={styles.sign_up_row}>
          <label className={styles.sign_up_label} htmlFor="email">
            <MdOutlineMail className={styles.sign_up_icon} />
          </label>
          <input
            className={styles.sign_up_input}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            autoComplete="off"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setData({
                ...data,
                email: e.target.value,
              });
            }}
          />
        </div>
        <div className={styles.sign_up_row}>
          <label className={styles.sign_up_label} htmlFor="email">
            <FiUser className={styles.sign_up_icon} />
          </label>
          <input
            className={styles.sign_up_input}
            type="text"
            id="displayname"
            name="displayname"
            placeholder="Display Name"
            autoComplete="off"
            required
            onChange={(e) => setData({ ...data, displayName: e.target.value })}
          />
        </div>
        <div className={styles.sign_up_row}>
          <label className={styles.sign_up_label} htmlFor="password">
            <IoLockClosedOutline className={styles.sign_up_icon} />
          </label>
          <input
            className={styles.sign_up_input}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            autoComplete="off"
            pattern=".{8,}"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setData({
                ...data,
                password: e.target.value,
              });
              validatePasswordCharacters(e.target.value);
            }}
          />
          <span className={styles.sign_up_password_error}>{passwordError}</span>
        </div>
        <div className={styles.sign_up_row}>
          <label className={styles.sign_up_label} htmlFor="confirmPassword">
            <IoLockClosedOutline className={styles.sign_up_icon} />
          </label>
          <input
            className={styles.sign_up_input}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            autoComplete="off"
            pattern=".{8,}"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setConfirmPassword(e.target.value);
            }}
          />
          {data.password !== confirmPassword ? (
            <span className={styles.sign_up_password_error}>
              The confirm password does not match
            </span>
          ) : (
            <Fragment></Fragment>
          )}
        </div>
      </div>
      <Link href="/sign-in" className={styles.already_member_text}>
        I am already a member
      </Link>
      <button
        type="submit"
        className={
          !canSubmit ? styles.sign_up_button_disabled : styles.sign_up_button
        }
      >
        Register
      </button>
    </form>
  );
};

export default SignUpPage;
