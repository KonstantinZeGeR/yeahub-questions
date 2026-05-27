import styles from "./Header.module.css";
import logo from "../../assets/icons/logo.svg";
import { Button } from "../Button/Button";

const navItems = ["База вопросов", "Тренажёр", "Материалы", "Навыки (hh)"];

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <img src={logo} alt="YeaHub-logo" className={styles.logo} />
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item}>
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.actions}>
          <Button variant="ghost" onClick={() => {}}>
            Вход
          </Button>
          <Button variant="primary" onClick={() => {}}>
            Регистрация
          </Button>
        </div>
      </div>
    </header>
  );
}
