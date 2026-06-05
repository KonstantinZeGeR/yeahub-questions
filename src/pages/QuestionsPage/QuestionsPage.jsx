import { useEffect, useState } from "react";
import { getQuestions } from "../../api/questions/getQuestions";
import { QuestionsList } from "../../features/QuestionsList/QuestionsList";
import { Pagination } from "../../components/Pagination/Pagination";
import { useDebounce } from "../../hooks/useDebounce";
import styles from "./QuestionsPage.module.css";

export function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 1000);
  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      try {
        const response = await getQuestions({
          page: currentPage,
          search: debouncedSearch,
        });
        setQuestions(response.data);
        setTotal(response.total);
      } catch (error) {
        console.error("Error:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadQuestions();
  }, [currentPage, debouncedSearch]);

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Вопросы</h1>
      <p className={styles.subtitle}>Всего вопросов: {total}</p>
      <input
        className={styles.search}
        type="text"
        placeholder="Поиск по вопросам"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      {isLoading ? <p>Loading...</p> : <QuestionsList questions={questions} />}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
