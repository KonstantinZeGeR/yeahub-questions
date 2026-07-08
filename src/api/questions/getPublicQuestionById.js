import { API_URL } from "../config";

export async function getPublicQuestionById(id) {
  const response = await fetch(`${API_URL}/questions/public-questions/${id}`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
