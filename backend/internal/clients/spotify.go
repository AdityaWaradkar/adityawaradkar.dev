package clients

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
	"time"

	"github.com/AdityaWaradkar/adityawaradkar.dev/backend/internal/models"
)

// getSpotifyAccessToken exchanges a long-lived refresh token for a short-lived access token.
// Spotify access tokens expire after 1 hour, so this must be called before each API request.
func getSpotifyAccessToken(clientID, clientSecret, refreshToken string) (string, error) {
	// Base64 encode the Client ID and Secret for the Basic Auth header
	auth := base64.StdEncoding.EncodeToString([]byte(clientID + ":" + clientSecret))
	
	// Prepare the form data payload
	data := url.Values{}
	data.Set("grant_type", "refresh_token")
	data.Set("refresh_token", refreshToken)

	// Create the POST request
	req, err := http.NewRequest("POST", "https://accounts.spotify.com/api/token", strings.NewReader(data.Encode()))
	if err != nil {
		return "", fmt.Errorf("failed to create spotify token request: %w", err)
	}
	
	req.Header.Set("Authorization", "Basic "+auth)
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	// Execute the request
	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return "", fmt.Errorf("failed to execute spotify token request: %w", err)
	}
	defer resp.Body.Close()

	// Check for HTTP errors (e.g., 400 Bad Request if the refresh token is invalid)
	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return "", fmt.Errorf("spotify token error (status %d): %s", resp.StatusCode, string(body))
	}

	// Parse the JSON response to extract the access token
	var result struct {
		AccessToken string `json:"access_token"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return "", fmt.Errorf("failed to decode spotify token response: %w", err)
	}
	
	return result.AccessToken, nil
}

// FetchRecentTracks retrieves the user's 5 most recently played tracks.
func FetchRecentTracks(clientID, clientSecret, refreshToken string) ([]models.SpotifyTrack, error) {
	// First, get a valid access token
	token, err := getSpotifyAccessToken(clientID, clientSecret, refreshToken)
	if err != nil {
		return nil, err
	}

	// Create the GET request for recently played tracks (limit to 5 for the frontend)
	req, err := http.NewRequest("GET", "https://api.spotify.com/v1/me/player/recently-played?limit=5", nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create spotify tracks request: %w", err)
	}
	req.Header.Set("Authorization", "Bearer "+token)

	// Execute the request
	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to execute spotify tracks request: %w", err)
	}
	defer resp.Body.Close()

	// Check for HTTP errors (e.g., 401 if the token is invalid, 429 if rate limited)
	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("spotify tracks error (status %d): %s", resp.StatusCode, string(body))
	}

	// Parse the JSON response
	var recent models.SpotifyRecentResponse
	if err := json.NewDecoder(resp.Body).Decode(&recent); err != nil {
		return nil, fmt.Errorf("failed to decode spotify tracks response: %w", err)
	}

	// Extract just the track details from the response wrapper
	var tracks []models.SpotifyTrack
	for _, item := range recent.Items {
		tracks = append(tracks, item.Track)
	}
	
	return tracks, nil
}