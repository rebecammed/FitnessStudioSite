const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function fetchApi(endpoint) {
  const res = await fetch(`${API_URL}${endpoint}`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}
