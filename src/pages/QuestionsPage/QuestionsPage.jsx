import { useEffect, useState } from "react";
import { getQuestions } from "../../api/questions/getQuestions";
import { QuestionsList } from "../../features/QuestionsList/QuestionsList";

export function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await getQuestions();
        setQuestions(response.data);
      } catch (error) {
        console.error("Error:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadQuestions();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div>
      <h1>Вопросы</h1>
      <p>Всего загружено: {questions.length}</p>
      <QuestionsList questions={questions} />
    </div>
  );
}
