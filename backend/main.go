package main

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"encoding/xml"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"
	"time"
)

// CORS middleware
func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	})
}

// Structs for Medium RSS
type RSS struct {
	Channel Channel `xml:"channel"`
}
type Channel struct {
	Items []Item `xml:"item"`
}
type Item struct {
	Title       string `xml:"title"`
	Link        string `xml:"link"`
	PubDate     string `xml:"pubDate"`
	Description string `xml:"description"`
	// Added to capture the media:thumbnail tag
	MediaThumbnail struct {
		URL string `xml:"url,attr"`
	} `xml:"thumbnail"`
}
type BlogPost struct {
	Title     string `json:"title"`
	Link      string `json:"link"`
	Date      string `json:"date"`
	Excerpt   string `json:"excerpt"`
	Thumbnail string `json:"thumbnail"`
}

// Structs for GitHub GraphQL
type GitHubQuery struct {
	Query string `json:"query"`
}
type GitHubResponse struct {
	Data struct {
		User struct {
			ContributionsCollection struct {
				ContributionCalendar struct {
					TotalContributions int `json:"totalContributions"`
					Weeks              []struct {
						ContributionDays []struct {
							ContributionCount int    `json:"contributionCount"`
							Date              string `json:"date"`
						} `json:"contributionDays"`
					} `json:"weeks"`
				} `json:"contributionCalendar"`
			} `json:"contributionsCollection"`
		} `json:"user"`
	} `json:"data"`
}

// Structs for Spotify
type SpotifyTrack struct {
	Name    string `json:"name"`
	Artists []struct {
		Name string `json:"name"`
	} `json:"artists"`
	Album struct {
		Images []struct {
			Url string `json:"url"`
		} `json:"images"`
	} `json:"album"`
	ExternalUrls struct {
		Spotify string `json:"spotify"`
	} `json:"external_urls"`
}
type SpotifyRecentResponse struct {
	Items []struct {
		Track SpotifyTrack `json:"track"`
	} `json:"items"`
}

// Structs for Contact Form
type ContactRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Message  string `json:"message"`
	Honeypot string `json:"honeypot"`
}

func getSpotifyAccessToken() (string, error) {
	clientID := os.Getenv("SPOTIFY_CLIENT_ID")
	clientSecret := os.Getenv("SPOTIFY_CLIENT_SECRET")
	refreshToken := os.Getenv("SPOTIFY_REFRESH_TOKEN")

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

func main() {
	mux := http.NewServeMux()

	// 1. Health Check
	mux.HandleFunc("GET /api/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{
			"status":  "ok",
			"message": "Go backend is running",
		})
	})

	// 2. Medium Blog
	mux.HandleFunc("GET /api/blog", func(w http.ResponseWriter, r *http.Request) {
		feedURL := "https://medium.com/feed/@adityawaradkar.learning"
		client := http.Client{Timeout: 10 * time.Second}
		resp, err := client.Get(feedURL)
		if err != nil {
			http.Error(w, "Failed to fetch RSS feed", http.StatusInternalServerError)
			return
		}
		defer resp.Body.Close()

		body, _ := io.ReadAll(resp.Body)
		var rss RSS
		xml.Unmarshal(body, &rss)

		var posts []BlogPost
		limit := 5
		if len(rss.Channel.Items) < limit {
			limit = len(rss.Channel.Items)
		}
		
		for i := 0; i < limit; i++ {
			item := rss.Channel.Items[i]
			
			// Extract Thumbnail
			thumbnail := item.MediaThumbnail.URL
			if thumbnail == "" {
				if start := strings.Index(item.Description, `<img src="`); start != -1 {
					start += 10
					if end := strings.Index(item.Description[start:], `"`); end != -1 {
						thumbnail = item.Description[start : start+end]
					}
				}
			}

			posts = append(posts, BlogPost{
				Title:     item.Title,
				Link:      item.Link,
				Date:      item.PubDate,
				Excerpt:   "Click to read the full article on Medium.",
				Thumbnail: thumbnail,
			})
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(posts)
	})

	// 3. GitHub Contributions
	mux.HandleFunc("GET /api/github", func(w http.ResponseWriter, r *http.Request) {
		token := os.Getenv("GITHUB_TOKEN")
		if token == "" {
			http.Error(w, "GitHub token not configured", http.StatusInternalServerError)
			return
		}

		query := GitHubQuery{
			Query: `query { user(login: "AdityaWaradkar") { contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { contributionCount date } } } } } }`,
		}
		jsonData, _ := json.Marshal(query)
		req, _ := http.NewRequest("POST", "https://api.github.com/graphql", bytes.NewBuffer(jsonData))
		req.Header.Set("Authorization", "bearer "+token)
		req.Header.Set("Content-Type", "application/json")

		client := &http.Client{Timeout: 10 * time.Second}
		resp, err := client.Do(req)
		if err != nil {
			http.Error(w, "Failed to fetch from GitHub", http.StatusInternalServerError)
			return
		}
		defer resp.Body.Close()

		body, _ := io.ReadAll(resp.Body)
		var ghResp GitHubResponse
		json.Unmarshal(body, &ghResp)

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(ghResp.Data.User.ContributionsCollection.ContributionCalendar)
	})

	// 4. Spotify Recent Tracks
	mux.HandleFunc("GET /api/spotify/recent", func(w http.ResponseWriter, r *http.Request) {
		token, err := getSpotifyAccessToken()
		if err != nil {
			http.Error(w, "Failed to refresh Spotify token", http.StatusInternalServerError)
			return
		}

		req, _ := http.NewRequest("GET", "https://api.spotify.com/v1/me/player/recently-played?limit=5", nil)
		req.Header.Set("Authorization", "Bearer "+token)

		client := &http.Client{Timeout: 10 * time.Second}
		resp, err := client.Do(req)
		if err != nil {
			http.Error(w, "Failed to fetch Spotify data", http.StatusInternalServerError)
			return
		}
		defer resp.Body.Close()

		var recent SpotifyRecentResponse
		json.NewDecoder(resp.Body).Decode(&recent)

		var tracks []SpotifyTrack
		for _, item := range recent.Items {
			tracks = append(tracks, item.Track)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(tracks)
	})

	// 5. Contact Form
	mux.HandleFunc("POST /api/contact", func(w http.ResponseWriter, r *http.Request) {
		var req ContactRequest
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

		resendPayload := map[string]interface{}{
			"from":    "Portfolio Contact <onboarding@resend.dev>",
			"to":      []string{"adityawaradkar2004@gmail.com"},
			"subject": "New message from " + req.Name,
			"html":    "<p><strong>Name:</strong> " + req.Name + "</p><p><strong>Email:</strong> " + req.Email + "</p><p><strong>Message:</strong></p><p>" + req.Message + "</p>",
		}

		payloadBytes, _ := json.Marshal(resendPayload)
		resendReq, _ := http.NewRequest("POST", "https://api.resend.com/emails", bytes.NewBuffer(payloadBytes))
		resendReq.Header.Set("Authorization", "Bearer "+apiKey)
		resendReq.Header.Set("Content-Type", "application/json")

		client := &http.Client{Timeout: 10 * time.Second}
		resp, err := client.Do(resendReq)
		if err != nil || resp.StatusCode >= 400 {
			http.Error(w, "Failed to send email", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"status": "success"})
	})

	port := ":8080"
	log.Printf("Starting server on port %s", port)
	handler := enableCORS(mux)
	if err := http.ListenAndServe(port, handler); err != nil {
		log.Fatal(err)
	}
}