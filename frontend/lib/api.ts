// frontend/lib/api.ts

// Fallback to the Docker service name if the environment variable isn't set
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://backend:8080';

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}