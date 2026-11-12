package clients

import (
	"encoding/base64"
	"encoding/json"
	"net/http"
	"net/url"
	"strings"
	"time"

	"github.com/AdityaWaradkar/adityawaradkar.dev/backend/internal/models"
)

func getSpotifyAccessToken(clientID, clientSecret, refreshToken string) (string, error) {
	auth := base64.StdEncoding.EncodeToString([]byte(clientID + ":" + clientSecret))
	data := url.Values{}
	data.Set("grant_type", "refresh_token")
	data.Set("refresh_token", refreshToken)

	req, _ := http.NewRequest("POST", "https://accounts.spotify.com/api/token", strings.NewReader(data.Encode()))
	req.Header.Set("Authorization", "Basic "+auth)
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	var result struct {
		AccessToken string `json:"access_token"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return "", err
	}
	return result.AccessToken, nil
}

func FetchRecentTracks(clientID, clientSecret, refreshToken string) ([]models.SpotifyTrack, error) {
	token, err := getSpotifyAccessToken(clientID, clientSecret, refreshToken)
	if err != nil {
		return nil, err
	}

	req, _ := http.NewRequest("GET", "https://api.spotify.com/v1/me/player/recently-played?limit=5", nil)
	req.Header.Set("Authorization", "Bearer "+token)

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var recent models.SpotifyRecentResponse
	json.NewDecoder(resp.Body).Decode(&recent)

	var tracks []models.SpotifyTrack
	for _, item := range recent.Items {
		tracks = append(tracks, item.Track)
	}
	return tracks, nil
}