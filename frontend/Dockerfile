# syntax=docker/dockerfile:1

# frontend/Dockerfile

# Use a lightweight Node image
FROM node:20-alpine

WORKDIR /app

# Install dependencies first. 
# This creates a cached Docker layer that only breaks if package.json changes.
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 3000

# Start Next.js in development mode
CMD ["npm", "run", "dev"]