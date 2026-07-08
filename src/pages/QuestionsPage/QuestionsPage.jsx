import { useEffect, useState } from "react";
import { getQuestions } from "../../api/questions/getQuestions";
import { QuestionsList } from "../../components/QuestionsList/QuestionsList";
import { Pagination } from "../../components/Pagination/Pagination";
import { useDebounce } from "../../hooks/useDebounce";
import { getSpecializations } from "../../api/specializations/getSpecializations";
import { getSkills } from "../../api/skills/getSkills";
import styles from "./QuestionsPage.module.css";
import { useSearchParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { QuestionsFilters } from "../../components/QuestionsFilters/QuestionsFilters";

export function QuestionsPage() {
  const [specializations, setSpecializations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const specializationId = searchParams.get("specializationId") ?? "";
  const selectedSkills = searchParams.getAll("skills");
  const currentPage = Number(searchParams.get("page")) || 1;
  const debouncedSearch = useDebounce(search, 300);

  const { data, loading, error } = useFetch(
    () =>
      getQuestions({
        page: currentPage,
        search: debouncedSearch,
        specializationId,
        skills: selectedSkills,
      }),
    [currentPage, debouncedSearch, specializationId, selectedSkills.join(",")],
  );

  const questions = data?.data ?? [];
  const total = data?.total ?? 0;
  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    getSpecializations()
      .then((response) => setSpecializations(response.data))
      .catch((error) => console.error("Специализация:", error));
  }, []);

  useEffect(() => {
    getSkills()
      .then((response) => setSkills(response.data))
      .catch((error) => console.error("Навыки:", error));
  }, []);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const toggleSkill = (id) => {
    const skillId = String(id);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      const current = next.getAll("skills");
      const updated = current.includes(skillId)
        ? current.filter((s) => s !== skillId)
        : [...current, skillId];

      next.delete("skills");
      updated.forEach((skillFromUrl) => next.append("skills", skillFromUrl));
      next.set("page", 1);
      return next;
    });
  };

  const handlePageChange = (page) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("search", page);
      return next;
    });
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Вопросы</h1>
      <p className={styles.subtitle}>Всего вопросов: {total}</p>

      <QuestionsFilters
        search={search}
        specializationId={specializationId}
        selectedSkills={selectedSkills}
        specializations={specializations}
        skills={skills}
        onSearchChange={(value) => {
          setSearchParams(
            (prev) => {
              const next = new URLSearchParams(prev);
              next.set("search", value);
              next.set("page", 1);
              return next;
            },
            { replace: true },
          );
        }}
        onSpecChange={(value) => {
          setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            if (value) next.set("specializationId", value);
            else next.delete("specializationId");
            next.set("page", 1);
            return next;
          });
        }}
        onToggleSkill={toggleSkill}
      />

      {loading && questions.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <QuestionsList questions={questions} />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
