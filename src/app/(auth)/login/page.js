"use client";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";

const LoginForm = () => {

  const {user, handleEmailSignin} = useFirebaseAuth();
  const router = useRouter();


  const handleForm = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const data = await handleEmailSignin(email, password);
    const token = await data.user.user.accessToken;
     await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
    router.push('/');
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleForm}>
        <h2 className={styles.title}>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

