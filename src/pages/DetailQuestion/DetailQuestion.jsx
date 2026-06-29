import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { getPublicQuestionById } from "../../api/questions/getPublicQuestionById";

export function DetailQuestion() {
  const { id } = useParams();
  const { data: question, loading, error } = useFetch(
    () => getPublicQuestionById(id),
    [id]
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!question) return null;

  return (
    <div>
      <h1>{question.title}</h1>
      <p>{question.description}</p>
    </div>
  );
}