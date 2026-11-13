package models

// ============================================================================
// Medium API Models
// ============================================================================

// RSS represents the root XML structure of a Medium feed.
type RSS struct {
	Channel Channel `xml:"channel"`
}

type Channel struct {
	Items []Item `xml:"item"`
}

// Item represents a single blog post in the XML feed.
// Includes a struct for the media thumbnail, as Medium's XML format is often inconsistent.
type Item struct {
	Title       string `xml:"title"`
	Link        string `xml:"link"`
	PubDate     string `xml:"pubDate"`
	Description string `xml:"description"`
	
	// MediaThumbnail attempts to capture the <media:thumbnail> tag
	MediaThumbnail struct {
		URL string `xml:"url,attr"`
	} `xml:"thumbnail"`
}

// BlogPost is the clean, JSON-friendly struct sent to the frontend.
type BlogPost struct {
	Title     string `json:"title"`
	Link      string `json:"link"`
	Date      string `json:"date"`
	Excerpt   string `json:"excerpt"`
	Thumbnail string `json:"thumbnail"`
}

// ============================================================================
// GitHub API Models
// ============================================================================

// GitHubQuery wraps the GraphQL query string required by the GitHub API.
type GitHubQuery struct {
	Query string `json:"query"`
}

// GitHubResponse maps the deeply nested GraphQL response for the contribution graph.
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

// ============================================================================
// Spotify API Models
// ============================================================================

// SpotifyTrack represents a single track object returned by the Spotify API.
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

// SpotifyRecentResponse maps the wrapper object returned by the "recently played" endpoint.
type SpotifyRecentResponse struct {
	Items []struct {
		Track SpotifyTrack `json:"track"`
	} `json:"items"`
}

// ============================================================================
// Contact Form Models
// ============================================================================

// ContactRequest maps the incoming JSON payload from the frontend contact form.
type ContactRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Message  string `json:"message"`
	Honeypot string `json:"honeypot"` // Used to detect spam bots
}