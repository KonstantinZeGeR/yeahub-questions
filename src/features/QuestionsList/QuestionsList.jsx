import { QuestionCard } from "../../components/QuestionCard/QuestionCard";
import  styles  from "./QuestionsList.module.css";

export function QuestionsList({ questions }) {
  return (
    <ul className={styles.list}>
      {questions.map(({ id, title, description }) => (
        <li key={id}>
          <QuestionCard title={title} description={description} />
        </li>
      ))}
    </ul>
  );
}
