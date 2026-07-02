import { useEffect, useState } from "react";
import { getQuestions } from "../../api/questions/getQuestions";
import { QuestionsList } from "../../features/QuestionsList/QuestionsList";
import { Pagination } from "../../components/Pagination/Pagination";
import { useDebounce } from "../../hooks/useDebounce";
import { getSpecializations } from "../../api/specializations/getSpecializations";
import { getSkills } from "../../api/skills/getSkills";
import styles from "./QuestionsPage.module.css";
import { useSearchParams } from "react-router-dom";

export function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [specializations, setSpecializations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const specializationId = searchParams.get("specializationId") ?? "";
  const selectedSkills = searchParams.getAll("skills");
  const currentPage = Number(searchParams.get("page") ?? 1);
  const debouncedSearch = useDebounce(search, 300);
  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    getSpecializations().then((response) => {
      setSpecializations(response.data);
    });
  }, []);

  useEffect(() => {
    getSkills().then((response) => {
      setSkills(response.data);
    });
  }, []);

  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      try {
        const response = await getQuestions({
          page: currentPage,
          search: debouncedSearch,
          specializationId,
          skills: selectedSkills,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentPage,
    debouncedSearch,
    specializationId,
    selectedSkills.join(","),
  ]);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const toggleSkill = (id) => {
    const skillId = String(id);
    setSearchParams((prev) => {
      const current = prev.getAll("skills");
      const next = current.includes(skillId)
        ? current.filter((s) => s !== skillId)
        : [...current, skillId];

      prev.delete("skills");
      next.forEach((skillFromUrl) => prev.append("skills", skillFromUrl));
      prev.set("page", 1);
      return prev;
    });
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Вопросы</h1>
      <p className={styles.subtitle}>Всего вопросов: {total}</p>
      <div className={styles.filters}>
        <input
          className={styles.search}
          type="text"
          placeholder="Поиск по вопросам"
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            setSearchParams((prev) => {
              prev.set("search", value);
              prev.set("page", 1);
              return prev;
            });
          }}
        />

        <select
          className={styles.select}
          value={specializationId}
          onChange={(e) => {
            const value = e.target.value;
            setSearchParams((prev) => {
              if (value) {
                prev.set("specializationId", value);
              } else {
                prev.delete("specializationId");
              }
              prev.set("page", 1)
              return prev;
            });
          }}
        >
          <option value="">Все специализации</option>
          {specializations.map((spec) => (
            <option key={spec.id} value={spec.id}>
              {spec.title}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.chips}>
        {skills.map((skill) => (
          <button
            key={skill.id}
            className={`${styles.chip} ${selectedSkills.includes(skill.id) ? styles.chipActive : ""}`}
            onClick={() => toggleSkill(skill.id)}
          >
            {skill.title}
          </button>
        ))}
      </div>

      {isLoading && questions.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <QuestionsList questions={questions} />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) =>
          setSearchParams((prev) => {
            prev.set("page", page);
            return prev;
          })
        }
      />
    </div>
  );
}
