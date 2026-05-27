import styles from "./Button.module.css";

export function Button({ variant, children, onClick }) {
  return (
    <button className={`${styles.button} ${styles[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
}
