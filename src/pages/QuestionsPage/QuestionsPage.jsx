import { useEffect, useState } from "react";
import { getQuestions } from "../../api/questions/getQuestions";
import { QuestionsList } from "../../features/QuestionsList/QuestionsList";
import { Pagination } from "../../components/Pagination/Pagination";
import { useDebounce } from "../../hooks/useDebounce";
import { getSpecializations } from "../../api/specializations/getSpecializations";
import { getSkills } from "../../api/skills/getSkills";
import styles from "./QuestionsPage.module.css";

export function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [specializations, setSpecializations] = useState([]);
  const [specializationId, setSpecializationId] = useState("");
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

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
  }, [currentPage, debouncedSearch, specializationId, selectedSkills]);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const toggleSkill = (id) => {
    if (selectedSkills.includes(id)) {
      setSelectedSkills(selectedSkills.filter((skillId) => skillId !== id));
    } else {
      setSelectedSkills([...selectedSkills, id]);
    }
    setCurrentPage(1);
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
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          className={styles.select}
          value={specializationId}
          onChange={(e) => {
            setSpecializationId(e.target.value);
            setCurrentPage(1);
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

      {isLoading ? <p>Loading...</p> : <QuestionsList questions={questions} />}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
