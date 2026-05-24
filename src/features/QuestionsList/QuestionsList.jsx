import { QuestionCard } from "../../components/QuestionCard/QuestionCard";

export function QuestionsList({ questions }) {
  return (
    <ul>
      {questions.map(({ id, title, description }) => (
        <li key={id}>
          <QuestionCard title={title} description={description} />
        </li>
      ))}
    </ul>
  );
}
