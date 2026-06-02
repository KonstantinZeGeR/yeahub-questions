import styles from "./Pagination.module.css";

function getPageNumbers(currentPage, totalPages) {
  const anchors = new Set();
  const candidates = [
    1,
    totalPages,
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ];

  for (const n of candidates) {
    if (n >= 1 && n <= totalPages) {
      anchors.add(n);
    }
  }

  const sorted = [...anchors].sort((a, b) => a - b);

  const result = [];
  for (let i = 0; i < sorted.length; i++) {
    result.push(sorted[i]);
    const next = sorted[i + 1];
    if (next && next - sorted[i] > 1) {
      result.push("...");
    }
  }

  return result;
}

export function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav className={styles.pagination}>
      <button
        className={styles.arrow}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Назад
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={`dots-${index}`} className={styles.dots}>
            …
          </span>
        ) : (
          <button
            key={page}
            className={`${styles.page} ${page === currentPage ? styles.active : ""}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ),
      )}

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
