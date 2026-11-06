package main

import (
	"encoding/json"
	"encoding/xml"
	"io"
	"log"
	"net/http"
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

// Clean JSON response struct
type BlogPost struct {
	Title     string `json:"title"`
	Link      string `json:"link"`
	Date      string `json:"date"`
	Excerpt   string `json:"excerpt"`
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

	// New Medium RSS Endpoint
	mux.HandleFunc("GET /api/blog", func(w http.ResponseWriter, r *http.Request) {
		// TODO: Replace this URL with your actual Medium feed (e.g., https://medium.com/feed/@adityawaradkar)
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
		// Limit to the 5 most recent posts to keep the payload small
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
				// For a real implementation, we would strip HTML tags from the description
				Excerpt: "Click to read the full article on Medium.", 
			})
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(posts)
	})

	port := ":8080"
	log.Printf("Starting server on port %s", port)
	handler := enableCORS(mux)
	if err := http.ListenAndServe(port, handler); err != nil {
		log.Fatal(err)
	}
}