# syntax=docker/dockerfile:1

FROM golang:1.23-alpine AS builder

WORKDIR /app

# Copy dependency files first for better caching
COPY go.mod go.sum* ./

# Mount cache for Go modules
RUN --mount=type=cache,target=/go/pkg/mod \
    go mod download

# Copy the rest of the code
COPY . .

# Mount caches for Go modules and build cache
RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    CGO_ENABLED=0 GOOS=linux go build -o main .

# Final minimal image
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/main .
EXPOSE 8080
CMD ["./main"]