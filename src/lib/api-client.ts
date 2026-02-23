const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api";

export async function client<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || `Request failed with status ${res.status}`);
  }

  return res.json();
}
