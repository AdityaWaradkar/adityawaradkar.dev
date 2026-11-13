package clients

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/AdityaWaradkar/adityawaradkar.dev/backend/internal/models"
)

// FetchGitHubContributions queries the GitHub GraphQL API to retrieve the user's 
// contribution calendar data (the green dot graph).
func FetchGitHubContributions(token string) (models.GitHubResponse, error) {
	// Construct the GraphQL query specific to our needs
	query := models.GitHubQuery{
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

	// Encode the query into a JSON payload
	jsonData, err := json.Marshal(query)
	if err != nil {
		return models.GitHubResponse{}, fmt.Errorf("failed to marshal GitHub query: %w", err)
	}

	// Create a POST request to the GitHub GraphQL endpoint
	req, err := http.NewRequest("POST", "https://api.github.com/graphql", bytes.NewBuffer(jsonData))
	if err != nil {
		return models.GitHubResponse{}, fmt.Errorf("failed to create GitHub request: %w", err)
	}

	// Authenticate using the provided token and set content type
	req.Header.Set("Authorization", "bearer "+token)
	req.Header.Set("Content-Type", "application/json")

	// Execute the HTTP request with a sensible timeout
	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return models.GitHubResponse{}, fmt.Errorf("failed to execute GitHub request: %w", err)
	}
	defer resp.Body.Close()

	// Read the raw response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return models.GitHubResponse{}, fmt.Errorf("failed to read GitHub response body: %w", err)
	}

	// If GitHub returns an error status (e.g., 401 Unauthorized or 502 Bad Gateway), 
	// return an error instead of trying to parse the HTML error page as JSON.
	if resp.StatusCode != http.StatusOK {
		return models.GitHubResponse{}, fmt.Errorf("GitHub API returned status %d: %s", resp.StatusCode, string(body))
	}

	// Parse the JSON response into our predefined struct
	var ghResp models.GitHubResponse
	if err := json.Unmarshal(body, &ghResp); err != nil {
		return models.GitHubResponse{}, fmt.Errorf("failed to unmarshal GitHub response: %w", err)
	}

	return ghResp, nil
}