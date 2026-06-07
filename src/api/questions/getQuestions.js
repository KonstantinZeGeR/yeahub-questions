const API_URL = import.meta.env.VITE_API_URL;

export async function getQuestions({
  page = 1,
  limit = 10,
  search = "",
  specializationId,
  skills = [],
} = {}) {
  const params = new URLSearchParams({ page, limit });
  if (search) {
    params.append("titleOrDescription", search);
  }
  if (specializationId) {
    params.append("specializationId", specializationId);
  }
  if (skills) {
    skills.forEach((id) => params.append("skills", id));
  }

  const response = await fetch(
    `${API_URL}/questions/public-questions?${params}`,
  );
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  
  const data = await response.json();
  return data;
}
