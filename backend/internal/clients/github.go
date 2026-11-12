package clients

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"time"

	"github.com/AdityaWaradkar/adityawaradkar.dev/backend/internal/models"
)

func FetchGitHubContributions(token string) (models.GitHubResponse, error) {
	query := models.GitHubQuery{
		Query: `query { user(login: "AdityaWaradkar") { contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { contributionCount date } } } } } }`,
	}
	jsonData, _ := json.Marshal(query)
	req, _ := http.NewRequest("POST", "https://api.github.com/graphql", bytes.NewBuffer(jsonData))
	req.Header.Set("Authorization", "bearer "+token)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return models.GitHubResponse{}, err
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	var ghResp models.GitHubResponse
	json.Unmarshal(body, &ghResp)

	return ghResp, nil
}