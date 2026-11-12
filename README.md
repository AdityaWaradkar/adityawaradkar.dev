# Aditya Waradkar - Personal Website

[![Live Site](https://img.shields.io/badge/Live_Site-adityawaradkar.dev-success?style=flat-square)](https://adityawaradkar.dev)
[![Frontend](https://img.shields.io/badge/Frontend-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)
[![Backend](https://img.shields.io/badge/Backend-Render-blue?style=flat-square)](https://render.com)
[![Go](https://img.shields.io/badge/Go-1.23-00ADD8?style=flat-square&logo=go)](https://go.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)

A highly optimized, full-stack personal portfolio and digital garden. This site serves as a centralized hub for my technical work, artistic practice (pencil sketches and paintings), and personal interests (music and reading).

## Live Site
**[https://adityawaradkar.dev](https://adityawaradkar.dev)**

## Architecture

This project is built as a monorepo, separating the frontend client from the backend API to ensure high performance and security.

- **Frontend:** Next.js 16 (App Router, Turbopack) with Tailwind CSS v4 for styling. Hosted on Vercel.
- **Backend:** Go (Standard Library `net/http`) containerized with Docker. Hosted on Render.
- **Design System:** Custom cream/brown/sage palette with Fraunces (Serif), Inter (Sans), and IBM Plex Mono (Monospace) fonts.

## Features

- **Technical Portfolio:** Dynamically rendered experience timeline and project showcase with detailed write-ups.
- **Art Gallery:** A custom gallery featuring sketches and paintings with a keyboard-navigable, focus-trapped lightbox.
- **Music Dashboard:** Curated lists of top artists and albums, linked directly to Spotify.
- **Reading List:** A curated list of books with personal notes and reading status.
- **Blog Aggregator:** Server-side fetching of Medium RSS feed with custom image extraction, caching, and graceful fallbacks.
- **GitHub Activity:** Real-time contribution graph generated via GitHub's GraphQL API.
- **Contact Form:** Fully functional with server-side validation, honeypot spam protection, and Resend email integration.
- **Optimized SEO:** Dynamic Open Graph images, sitemaps, and structured data.

## Monorepo Structure

```text
/
├── frontend/          # Next.js App Router application
│   ├── app/           # Routes and pages
│   ├── components/    # Reusable UI components
│   ├── lib/           # Data files, API clients, and types
│   └── public/        # Static assets (art, albums, books, noise)
├── backend/           # Go API server
│   ├── internal/      # Modular internal packages
│   │   ├── api/       # HTTP handlers and CORS middleware
│   │   ├── clients/   # External API clients (Medium, GitHub, Spotify, Resend)
│   │   └── models/    # Data structs
│   └── main.go        # Entry point
├── docker-compose.yml # Local development environment
└── README.md
```

## Local Development

### Prerequisites
- Docker and Docker Compose
- Node.js (v20+) and npm
- Go (v1.23+)

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AdityaWaradkar/adityawaradkar.dev.git
   cd adityawaradkar.dev
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   # GitHub API (Fine-grained token with read:user scope)
   GITHUB_TOKEN=your_github_token

   # Spotify API (Requires a refresh token)
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token

   # Resend API (For contact form)
   RESEND_API_KEY=your_resend_api_key
   ```

3. **Run the local stack:**
   ```bash
   docker compose up --build
   ```

4. **Access the application:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8080/api/health](http://localhost:8080/api/health)

## Update Workflow

The site is designed to be easily updated without touching complex code. Most changes only require editing a data file in the `frontend/lib/` directory:
- **Art:** Add an image to `public/images/art/` and update `lib/artData.ts`.
- **Books:** Update `lib/booksData.ts`.
- **Music:** Update `lib/musicData.ts`.
- **Projects/Experience:** Update `lib/data.ts`.

Once you commit and push to `main`, Vercel and Render will automatically rebuild and deploy the changes.

## Security & Privacy
- API keys and secrets are stored securely in environment variables (never in the client bundle).
- The Go backend implements a strict CORS policy, only allowing requests from `https://adityawaradkar.dev`.
- The contact form implements a honeypot field to prevent spam.
- No tracking pixels; analytics are anonymized.

---
*Built with care by [Aditya Waradkar](https://adityawaradkar.dev).*