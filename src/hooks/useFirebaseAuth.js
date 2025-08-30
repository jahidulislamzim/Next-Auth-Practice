import initializeFirebase from "@/libs/firebaseClient";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect} from "react";

initializeFirebase();

const useFirebase = () => {
  const auth = getAuth();

  const [user, setUser] = useState(null)


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

  return { user, handleEmailSignin };
};

export default useFirebase;
