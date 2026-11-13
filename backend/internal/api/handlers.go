package api

import (
	"encoding/json"
	"net/http"
	"os"

	"github.com/AdityaWaradkar/adityawaradkar.dev/backend/internal/clients"
	"github.com/AdityaWaradkar/adityawaradkar.dev/backend/internal/models"
)

// HealthCheck acts as a simple ping to verify the server is running.
// Used by Render to check if the service is healthy.
func HealthCheck(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"status":  "ok",
		"message": "Go backend is running",
	})
}

// GetBlogPosts fetches the latest Medium articles via RSS.
// It returns a JSON array of the 5 most recent posts with thumbnails.
func GetBlogPosts(w http.ResponseWriter, r *http.Request) {
	posts, err := clients.FetchMediumPosts("https://medium.com/feed/@adityawaradkar.learning")
	if err != nil {
		http.Error(w, "Failed to fetch RSS feed", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(posts)
}

// GetGitHubData retrieves the user's contribution graph data.
// Requires a GITHUB_TOKEN environment variable to authenticate the GraphQL request.
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

	// Only return the specific calendar data the frontend needs, not the whole wrapper
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(ghResp.Data.User.ContributionsCollection.ContributionCalendar)
}

// GetSpotifyData fetches the user's 5 most recently played tracks.
// Requires Spotify OAuth credentials stored in environment variables.
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

// PostContact handles the contact form submission.
// It includes spam protection (honeypot) and sends an email via Resend.
func PostContact(w http.ResponseWriter, r *http.Request) {
	var req models.ContactRequest
	
	// Parse the incoming JSON payload
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Honeypot spam protection: If a bot fills this hidden field, silently reject the request.
	// We return 200 OK so the bot thinks it succeeded, but we do nothing.
	if req.Honeypot != "" {
		w.WriteHeader(http.StatusOK)
		return
	}

	// Basic validation to ensure required fields are present
	if req.Name == "" || req.Email == "" || req.Message == "" {
		http.Error(w, "Missing required fields", http.StatusBadRequest)
		return
	}

	// Check for Resend API key
	apiKey := os.Getenv("RESEND_API_KEY")
	if apiKey == "" {
		http.Error(w, "Email service not configured", http.StatusInternalServerError)
		return
	}

	// Send the email via the Resend client
	_, err := clients.SendContactEmail(apiKey, req.Name, req.Email, req.Message)
	if err != nil {
		http.Error(w, "Failed to send email", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}