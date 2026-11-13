# syntax=docker/dockerfile:1

# ------------------------------------------------------------------------------
# Stage 1: Builder
# We use a full Go image here to compile the source code.
# ------------------------------------------------------------------------------
FROM golang:1.23-alpine AS builder

WORKDIR /app

# Copy dependency manifests first. This allows Docker to cache the `go mod download` 
# step and avoids re-downloading modules every time a source file changes.
COPY go.mod go.sum* ./

# Download Go modules using a BuildKit cache mount to speed up subsequent builds
RUN --mount=type=cache,target=/go/pkg/mod \
    go mod download

# Copy the rest of the application source code
COPY . .

# Compile the Go binary. 
# - CGO_ENABLED=0: Creates a statically linked binary, which is required to run on a minimal Alpine image.
# - GOOS=linux: Ensures the binary is built for the Linux container environment.
# - Cache mounts are used for both the module cache and the build cache.
RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    CGO_ENABLED=0 GOOS=linux go build -o main .

# ------------------------------------------------------------------------------
# Stage 2: Final Image
# We use a minimal Alpine image to keep the final container size extremely small.
# ------------------------------------------------------------------------------
FROM alpine:latest

# Install CA certificates. Required for our Go app to make HTTPS requests 
# to external APIs (GitHub, Spotify, Medium, Resend).
RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Copy ONLY the compiled binary from the builder stage. 
# We do not copy the source code, go modules, or the Go compiler into the final image.
COPY --from=builder /app/main .

EXPOSE 8080

# Start the application
CMD ["./main"]