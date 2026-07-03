import { Link, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { getPublicQuestionById } from "../../api/questions/getPublicQuestionById";
import styles from "./DetailQuestion.module.css";

export function DetailQuestion() {
  const { id } = useParams();
  const {
    data: question,
    loading,
    error,
  } = useFetch(() => getPublicQuestionById(id), [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!question) return null;

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.back}>
        К списку вопросов
      </Link>
      {question.imageSrc && (
        <img src={question.imageSrc} alt="question" width={80} />
      )}{" "}
      <h1>{question.title}</h1>
      <p>{question.description}</p>
      <p>Сложность: {question.complexity}</p>
      <p>Рейтинг: {question.rate}</p>
      <p>Навыки:</p>
      <ul className={styles.tags}>
        {question.questionSkills.map((skill) => (
          <li className={styles.tag} key={skill.id}>
            {skill.title}
          </li>
        ))}
      </ul>
      <p>Ключевые слова:</p>
      <ul className={styles.tags}>
        {question.keywords.map((keyword) => (
          <li className={styles.tag} key={keyword}>
            #{keyword}
          </li>
        ))}
      </ul>
      <p>Автор: {question.createdBy?.username}</p>
      <div className={styles.card}>
        <h2>Краткий ответ</h2>
        <div dangerouslySetInnerHTML={{ __html: question.shortAnswer }} />

        <h2>Развёрнутый ответ</h2>
        <div dangerouslySetInnerHTML={{ __html: question.longAnswer }} />
      </div>
    </div>
  );
}
