import { Link } from "react-router";
import styles from "./Header.module.css";
import { useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem("token");
    console.log("User logged out");
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Link to={"/"}>Blog App</Link>
      </h1>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to={"/"} className={styles.navLink}>
              Home
            </Link>
          </li>
          <button className={styles.logOut} onClick={handleClick}>
            Log Out
          </button>
        </ul>
      </nav>
    </header>
  );
}
