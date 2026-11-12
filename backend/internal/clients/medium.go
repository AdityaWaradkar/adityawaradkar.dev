package clients

import (
	"encoding/xml"
	"io"
	"net/http"
	"regexp"
	"strings"
	"time"

	"github.com/AdityaWaradkar/adityawaradkar.dev/backend/internal/models"
)

func FetchMediumPosts(feedURL string) ([]models.BlogPost, error) {
	client := http.Client{Timeout: 10 * time.Second}
	resp, err := client.Get(feedURL)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	var rss models.RSS
	xml.Unmarshal(body, &rss)

	// Compile the regex to find <img src="...">
	imgRegex := regexp.MustCompile(`<img[^>]+src="([^">]+)"`)
	
	// Get all matches from the raw XML body. 
	// This is much more reliable than parsing the XML description tags!
	matches := imgRegex.FindAllStringSubmatch(string(body), -1)

	var posts []models.BlogPost
	limit := 5
	if len(rss.Channel.Items) < limit {
		limit = len(rss.Channel.Items)
	}

	for i := 0; i < limit; i++ {
		item := rss.Channel.Items[i]
		
		thumbnail := ""
		// Attempt to get the thumbnail from our regex matches
		if i < len(matches) {
			thumbnail = matches[i][1]
			// Clean up any HTML entities like &amp;
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