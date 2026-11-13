package clients

import (
	"encoding/xml"
	"fmt"
	"io"
	"net/http"
	"regexp"
	"strings"
	"time"

	"github.com/AdityaWaradkar/adityawaradkar.dev/backend/internal/models"
)

// FetchMediumPosts retrieves the latest blog posts from a Medium RSS feed.
// It uses a regex workaround to extract thumbnails, as Medium's XML structure can be inconsistent.
func FetchMediumPosts(feedURL string) ([]models.BlogPost, error) {
	// Setup HTTP client with a timeout to prevent hanging requests
	client := http.Client{Timeout: 10 * time.Second}
	resp, err := client.Get(feedURL)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch medium feed: %w", err)
	}
	defer resp.Body.Close()

	// Check if the request was successful
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("medium feed returned status %d", resp.StatusCode)
	}

	// Read the raw response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read medium feed body: %w", err)
	}

	// Parse the XML body into our RSS struct
	var rss models.RSS
	if err := xml.Unmarshal(body, &rss); err != nil {
		return nil, fmt.Errorf("failed to unmarshal medium XML: %w", err)
	}

	// Compile the regex to find <img src="..."> tags. 
	// Medium sometimes embeds the thumbnail inside the HTML description rather than a dedicated XML tag.
	imgRegex := regexp.MustCompile(`<img[^>]+src="([^">]+)"`)
	
	// Extract all image URLs from the raw body string
	matches := imgRegex.FindAllStringSubmatch(string(body), -1)

	// Limit the number of posts to 5 to keep the frontend payload small
	limit := 5
	if len(rss.Channel.Items) < limit {
		limit = len(rss.Channel.Items)
	}

	var posts []models.BlogPost
	for i := 0; i < limit; i++ {
		item := rss.Channel.Items[i]
		
		thumbnail := ""
		// Match the thumbnail by index. Note: This assumes the images in the raw body 
		// align 1:1 with the RSS items, which is typical for standard Medium feeds.
		if i < len(matches) {
			thumbnail = matches[i][1]
			// Clean up any HTML entities like &amp; that might break the frontend Image component
			thumbnail = strings.ReplaceAll(thumbnail, "&amp;", "&")
		}

		posts = append(posts, models.BlogPost{
			Title:     item.Title,
			Link:      item.Link,
			Date:      item.PubDate,
			Excerpt:   "Click to read the full article on Medium.",
			Thumbnail: thumbnail,
		})
	}
	
	return posts, nil
}