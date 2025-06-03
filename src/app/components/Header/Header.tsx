import { Link } from "react-router";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Link to={"/"}>Blog App</Link>
      </h1>
    </header>
  );
}
