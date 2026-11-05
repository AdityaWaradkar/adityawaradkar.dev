package main

import (
	"encoding/json"
	"log"
	"net/http"
)

func main() {
	mux := http.NewServeMux()

	// Health check endpoint
	mux.HandleFunc("GET /api/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{
			"status":  "ok",
			"message": "Go backend is running",
		})
	})

	port := ":8080"
	log.Printf("Starting server on port %s", port)
	if err := http.ListenAndServe(port, mux); err != nil {
		log.Fatal(err)
	}
}