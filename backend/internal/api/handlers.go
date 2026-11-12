package api

import (
	"encoding/json"
	"net/http"
	"os"

	"github.com/AdityaWaradkar/adityawaradkar.dev/backend/internal/clients"
	"github.com/AdityaWaradkar/adityawaradkar.dev/backend/internal/models"
)

func HealthCheck(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"status":  "ok",
		"message": "Go backend is running",
	})
}

func GetBlogPosts(w http.ResponseWriter, r *http.Request) {
	posts, err := clients.FetchMediumPosts("https://medium.com/feed/@adityawaradkar.learning")
	if err != nil {
		http.Error(w, "Failed to fetch RSS feed", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(posts)
}

func GetGitHubData(w http.ResponseWriter, r *http.Request) {
	token := os.Getenv("GITHUB_TOKEN")
	if token == "" {
		http.Error(w, "GitHub token not configured", http.StatusInternalServerError)
		return
	}

	ghResp, err := clients.FetchGitHubContributions(token)
	if err != nil {
		http.Error(w, "Failed to fetch from GitHub", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(ghResp.Data.User.ContributionsCollection.ContributionCalendar)
}

func GetSpotifyData(w http.ResponseWriter, r *http.Request) {
	clientID := os.Getenv("SPOTIFY_CLIENT_ID")
	clientSecret := os.Getenv("SPOTIFY_CLIENT_SECRET")
	refreshToken := os.Getenv("SPOTIFY_REFRESH_TOKEN")

	tracks, err := clients.FetchRecentTracks(clientID, clientSecret, refreshToken)
	if err != nil {
		http.Error(w, "Failed to fetch Spotify data", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tracks)
}

func PostContact(w http.ResponseWriter, r *http.Request) {
	var req models.ContactRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	if req.Honeypot != "" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if req.Name == "" || req.Email == "" || req.Message == "" {
		http.Error(w, "Missing required fields", http.StatusBadRequest)
		return
	}

	apiKey := os.Getenv("RESEND_API_KEY")
	if apiKey == "" {
		http.Error(w, "Email service not configured", http.StatusInternalServerError)
		return
	}

	_, err := clients.SendContactEmail(apiKey, req.Name, req.Email, req.Message)
	if err != nil {
		http.Error(w, "Failed to send email", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}