"use client";
import useFirebase from "@/hooks/useFirebase";
import styles from "./login.module.css";

const LoginForm = () => {

  const {user, errorMessage, handleEmailSignin} = useFirebase();


  const handleForm = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const data = await handleEmailSignin(email, password);
    console.log(data);
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

