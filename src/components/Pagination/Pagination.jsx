import styles from "./Pagination.module.css";

export function Pagination({ currentPage, totalPages, onPageChange }) {
  // создаём массив [1, 2, 3, ..., totalPages]
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className={styles.pagination}>
      <button
        className={styles.arrow}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Назад
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`${styles.page} ${page === currentPage ? styles.active : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={styles.arrow}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Вперёд
      </button>
    </nav>
  );
}
