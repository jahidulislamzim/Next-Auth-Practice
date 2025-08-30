import Link from "next/link";
import styles from "./style.module.css";
const Header = () => {
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
      <Link href="/login" className={styles.link}>
        Login
      </Link>
    </nav>
  );
};

export default Header;
