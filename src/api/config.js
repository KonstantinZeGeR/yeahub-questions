// src/api/config.js
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("VITE_API_URL не задан. Скопируй .env.example → .env");
}
export { API_URL };
