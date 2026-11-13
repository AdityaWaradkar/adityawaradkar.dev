// frontend/lib/api.ts

/**
 * A wrapper around the native fetch API to standardize requests to the Go backend.
 * 
 * In local development (Docker), this falls back to `http://localhost:8080`.
 * In production (Vercel), it uses the `NEXT_PUBLIC_API_URL` environment variable.
 * 
 * Note: Because this is used in both Server Components (e.g., Blog page) and 
 * Client Components (e.g., BackendStatus), we rely on the environment variable 
 * to resolve the correct URL dynamically based on where the code is running.
 */
export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  
  // Use the production URL from Vercel, or fallback to localhost for local dev
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

  // Construct the full URL
  const url = `${baseUrl}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  // Throw an error if the HTTP status is not 2xx
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  // Return the parsed JSON response with the expected TypeScript type
  return response.json();
}