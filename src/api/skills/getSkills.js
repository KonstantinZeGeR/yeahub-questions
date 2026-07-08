import { API_URL } from "../config";

export async function getSkills() {
  const params = new URLSearchParams({ limit: 100 });

  const response = await fetch(`${API_URL}/skills?${params}`);

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const data = await response.json();

  return data;
}
