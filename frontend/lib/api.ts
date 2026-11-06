// frontend/lib/api.ts

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // If we are running on the server (inside Docker), use the Docker network name.
  // If we are in the browser, use localhost.
  const baseUrl = typeof window === 'undefined' 
    ? 'http://backend:8080' 
    : 'http://localhost:8080';

  const url = `${baseUrl}${endpoint}`;
  
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