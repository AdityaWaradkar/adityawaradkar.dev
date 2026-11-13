package clients

import (
	"bytes"
	"encoding/json"
	"fmt"
	"html"
	"io"
	"net/http"
	"time"
)

// SendContactEmail sends an email using the Resend API.
// It safely escapes user input to prevent HTML injection attacks in the email body.
func SendContactEmail(apiKey, name, email, message string) (bool, error) {
	// SECURITY: Escape user input to prevent HTML injection in the email.
	safeName := html.EscapeString(name)
	safeEmail := html.EscapeString(email)
	safeMessage := html.EscapeString(message)

	// Construct the payload for the Resend API
	resendPayload := map[string]interface{}{
		"from":    "Portfolio Contact <onboarding@resend.dev>",
		"to":      []string{"adityawaradkar2004@gmail.com"},
		"subject": "New message from " + safeName,
		"html":    "<p><strong>Name:</strong> " + safeName + "</p><p><strong>Email:</strong> " + safeEmail + "</p><p><strong>Message:</strong></p><p>" + safeMessage + "</p>",
	}

	// Encode payload to JSON
	payloadBytes, err := json.Marshal(resendPayload)
	if err != nil {
		return false, fmt.Errorf("failed to marshal email payload: %w", err)
	}

	// Create the HTTP POST request
	req, err := http.NewRequest("POST", "https://api.resend.com/emails", bytes.NewBuffer(payloadBytes))
	if err != nil {
		return false, fmt.Errorf("failed to create Resend request: %w", err)
	}

	// Authenticate and set headers
	req.Header.Set("Authorization", "Bearer "+apiKey)
	req.Header.Set("Content-Type", "application/json")

	// Execute the request
	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return false, fmt.Errorf("failed to execute Resend request: %w", err)
	}
	defer resp.Body.Close()

	// Check if the API returned a successful status code
	if resp.StatusCode >= 400 {
		// Read the error body for debugging (Resend usually returns JSON with details)
		body, _ := io.ReadAll(resp.Body)
		return false, fmt.Errorf("resend API error (status %d): %s", resp.StatusCode, string(body))
	}

	return true, nil
}