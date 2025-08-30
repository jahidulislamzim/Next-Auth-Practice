import initializeFirebase from "@/libs/firebaseClient";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

initializeFirebase();

const useFirebase = () => {
  const auth = getAuth();

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

  return { handleEmailSignin };
};

export default useFirebase;
