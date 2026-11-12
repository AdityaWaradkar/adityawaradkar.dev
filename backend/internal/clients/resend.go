package clients

import (
	"bytes"
	"encoding/json"
	"net/http"
	"time"
)

func SendContactEmail(apiKey, name, email, message string) (bool, error) {
	resendPayload := map[string]interface{}{
		"from":    "Portfolio Contact <onboarding@resend.dev>",
		"to":      []string{"adityawaradkar2004@gmail.com"},
		"subject": "New message from " + name,
		"html":    "<p><strong>Name:</strong> " + name + "</p><p><strong>Email:</strong> " + email + "</p><p><strong>Message:</strong></p><p>" + message + "</p>",
	}

	payloadBytes, _ := json.Marshal(resendPayload)
	req, _ := http.NewRequest("POST", "https://api.resend.com/emails", bytes.NewBuffer(payloadBytes))
	req.Header.Set("Authorization", "Bearer "+apiKey)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil || resp.StatusCode >= 400 {
		return false, err
	}
	return true, nil
}