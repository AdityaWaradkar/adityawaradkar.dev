package main

import (
	"log"
	"net/http"
	"os"

	"github.com/AdityaWaradkar/adityawaradkar.dev/backend/internal/api"
)

func main() {
	// -------------------------------------------------------------------------
	// Environment Variable Check
	// In production (Render), missing env vars can cause silent failures. 
	// This loop will print a warning at startup if any required keys are missing.
	// -------------------------------------------------------------------------
	requiredEnvVars := []string{
		"GITHUB_TOKEN", 
		"SPOTIFY_CLIENT_ID", 
		"SPOTIFY_CLIENT_SECRET", 
		"SPOTIFY_REFRESH_TOKEN", 
		"RESEND_API_KEY",
	}
	for _, env := range requiredEnvVars {
		if os.Getenv(env) == "" {
			log.Printf("WARNING: Missing environment variable: %s", env)
		}
	}

	// -------------------------------------------------------------------------
	// Route Setup
	// Go 1.22+ allows specifying HTTP methods directly in the route pattern.
	// -------------------------------------------------------------------------
	mux := http.NewServeMux()

	mux.HandleFunc("GET /api/health", api.HealthCheck)
	mux.HandleFunc("GET /api/blog", api.GetBlogPosts)
	mux.HandleFunc("GET /api/github", api.GetGitHubData)
	mux.HandleFunc("GET /api/spotify/recent", api.GetSpotifyData)
	mux.HandleFunc("POST /api/contact", api.PostContact)

	// -------------------------------------------------------------------------
	// Server Initialization
	// -------------------------------------------------------------------------
	port := ":8080"
	log.Printf("Starting server on port %s", port)
	
	// Wrap the mux with our custom CORS middleware
	handler := api.EnableCORS(mux)
	
	// Start the HTTP server. This is a blocking call.
	if err := http.ListenAndServe(port, handler); err != nil {
		log.Fatal(err)
	}
}