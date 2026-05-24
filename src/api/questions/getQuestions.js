const API_URL = import.meta.env.VITE_API_URL

export async function getQuestions() {
  const response = await fetch(`${API_URL}/questions/public-questions`)
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }
  const data = await response.json()
  return data
}