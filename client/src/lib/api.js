const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function fetchApi(endpoint, options = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, options);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to fetch data");
  }
  return res.json();
}
