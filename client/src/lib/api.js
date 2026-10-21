const API_URL = "";

export async function fetchApi(endpoint, options = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    credentials: "include", // To make sure it sends the session cookie
    ...options,
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to fetch data");
  }
  return res.json();
}
