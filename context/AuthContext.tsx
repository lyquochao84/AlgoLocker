"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/config/db";
import { useRouter } from "next/navigation";

// User data type interface
interface UserType {
  email: string | null;
  uid: string | null;
  displayName: string | null;
}

const AuthContext = createContext<any>({});

// Auth Context available across the app
export const useAuth = () => useContext<any>(AuthContext);

// Create the auth context provider
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Define user and loading state
  const [user, setUser] = useState<UserType>({
    email: null,
    uid: null,
    displayName: null,
  });
  const [loading, setLoading] = useState<Boolean>(true);
  const router = useRouter();

  const clearUserData = () => {
    setUser({ email: null, uid: null, displayName: null });
  };

  // Update the state depending on auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
        });
        // Redirect to /dashboard/ if the user is logged in
        router.replace("/dashboard/");
      } else {
        clearUserData();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]); // Add router to the dependency array

  // Sign up the user
  const signUp = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Set the display name
      await updateProfile(user, { displayName });

      setUser({
        email: user.email,
        uid: user.uid,
        displayName: user.displayName,
      });

      return user;
    } catch (error: any) {
      throw error;
    }
  };

  // Login the user
  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout the user
  const logOut = async () => {
    clearUserData();
    return await signOut(auth);
  };

  // Wrap the children with the context provider
  return (
    <AuthContext.Provider
      value={{ user, signUp, logIn, logOut, clearUserData }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
