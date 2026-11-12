package main

import (
	"log"
	"net/http"

	"github.com/AdityaWaradkar/adityawaradkar.dev/backend/internal/api"
)

func main() {
	mux := http.NewServeMux()

	// Routes
	mux.HandleFunc("GET /api/health", api.HealthCheck)
	mux.HandleFunc("GET /api/blog", api.GetBlogPosts)
	mux.HandleFunc("GET /api/github", api.GetGitHubData)
	mux.HandleFunc("GET /api/spotify/recent", api.GetSpotifyData)
	mux.HandleFunc("POST /api/contact", api.PostContact)

	port := ":8080"
	log.Printf("Starting server on port %s", port)
	
	// Wrap the mux with our CORS middleware
	handler := api.EnableCORS(mux)
	
	if err := http.ListenAndServe(port, handler); err != nil {
		log.Fatal(err)
	}
}