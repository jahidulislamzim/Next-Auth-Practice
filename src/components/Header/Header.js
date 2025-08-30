"use client";
import Link from "next/link";
import styles from "./style.module.css";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";
const Header = () => {
  const { user, handleLogout } = useFirebaseAuth();

  const handleLououtButton = async () => {
    const data = await handleLogout();
    fetch("/api/logout", {
      method: "POST",
    });
  };

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.link}>
        Home
      </Link>
      <Link href="/about" className={styles.link}>
        About
      </Link>
      <Link href="/services" className={styles.link}>
        Services
      </Link>
      <Link href="/contact" className={styles.link}>
        Contact
      </Link>
      {user ? (
        <button className={styles.button} onClick={handleLououtButton}>
          Log out
        </button>
      ) : (
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      )}
    </nav>
  );
};

export default Header;
