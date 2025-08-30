"use client";
import initializeFirebase from "@/libs/firebaseClient";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { useState, useEffect } from "react";

initializeFirebase();

const useFirebase = () => {
  const auth = getAuth();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ?? null);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleEmailSignin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return { user: userCredential, error: null };
    } catch (error) {
      return { user: null, error };
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      return { isLogout: true, error: null };
    } catch (error) {
      return { isLogout: false, error };
    }
  };

  return { user, handleEmailSignin, handleLogout};
};

export default useFirebase;
