package main

import (
	"bytes"
	"encoding/json"
	"encoding/xml"
	"io"
	"log"
	"net/http"
	"os"
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

// Structs to parse the Medium RSS Feed
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
}

type BlogPost struct {
	Title   string `json:"title"`
	Link    string `json:"link"`
	Date    string `json:"date"`
	Excerpt string `json:"excerpt"`
}

// GitHub GraphQL Structs
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

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /api/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{
			"status":  "ok",
			"message": "Go backend is running",
		})
	})

	// Medium RSS Endpoint
	mux.HandleFunc("GET /api/blog", func(w http.ResponseWriter, r *http.Request) {
		feedURL := "https://medium.com/feed/@adityawaradkar.learning"
		
		client := http.Client{Timeout: 10 * time.Second}
		resp, err := client.Get(feedURL)
		if err != nil {
			http.Error(w, "Failed to fetch RSS feed", http.StatusInternalServerError)
			return
		}
		defer resp.Body.Close()

		body, err := io.ReadAll(resp.Body)
		if err != nil {
			http.Error(w, "Failed to read response body", http.StatusInternalServerError)
			return
		}

		var rss RSS
		if err := xml.Unmarshal(body, &rss); err != nil {
			http.Error(w, "Failed to parse XML", http.StatusInternalServerError)
			return
		}

		var posts []BlogPost
		limit := 5
		if len(rss.Channel.Items) < limit {
			limit = len(rss.Channel.Items)
		}

		for i := 0; i < limit; i++ {
			item := rss.Channel.Items[i]
			posts = append(posts, BlogPost{
				Title:   item.Title,
				Link:    item.Link,
				Date:    item.PubDate,
				Excerpt: "Click to read the full article on Medium.", 
			})
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(posts)
	})

	// GitHub Contributions Endpoint
	mux.HandleFunc("GET /api/github", func(w http.ResponseWriter, r *http.Request) {
		token := os.Getenv("GITHUB_TOKEN")
		if token == "" {
			http.Error(w, "GitHub token not configured", http.StatusInternalServerError)
			return
		}

		query := GitHubQuery{
			Query: `query { 
				user(login: "AdityaWaradkar") { 
					contributionsCollection { 
						contributionCalendar { 
							totalContributions 
							weeks { 
								contributionDays { 
									contributionCount 
									date 
								} 
							} 
						} 
					} 
				} 
			}`,
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
		if err := json.Unmarshal(body, &ghResp); err != nil {
			http.Error(w, "Failed to parse GitHub response", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(ghResp.Data.User.ContributionsCollection.ContributionCalendar)
	})

	port := ":8080"
	log.Printf("Starting server on port %s", port)
	handler := enableCORS(mux)
	if err := http.ListenAndServe(port, handler); err != nil {
		log.Fatal(err)
	}
}