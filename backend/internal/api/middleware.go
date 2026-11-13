package api

import "net/http"

// EnableCORS wraps an http.Handler and configures Cross-Origin Resource Sharing (CORS).
// This ensures that only our specific frontend domains are allowed to make requests to the API.
func EnableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")
		
		// Allow requests from our production domains (root and www).
		// Echoing the origin back prevents wildcard (*) security issues.
		if origin == "https://adityawaradkar.dev" || origin == "https://www.adityawaradkar.dev" {
			w.Header().Set("Access-Control-Allow-Origin", origin)
		}
		
		// Define the allowed methods and headers for cross-origin requests.
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		
		// 'Vary: Origin' is crucial for caching. It tells browsers and CDNs 
		// that the response depends on the 'Origin' header, preventing cache poisoning.
		w.Header().Set("Vary", "Origin")

		// Handle preflight (OPTIONS) requests. 
		// Browsers send this automatically before complex requests (like POST with JSON)
		// to check if the server permits the actual request.
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		
		// Pass the request to the next handler if it's not an OPTIONS request
		next.ServeHTTP(w, r)
	})
}