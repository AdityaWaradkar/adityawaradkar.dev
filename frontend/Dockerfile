# frontend/Dockerfile

FROM node:20-alpine

WORKDIR /app

# Install dependencies first (better caching)
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 3000

# Start Next.js in development mode
CMD ["npm", "run", "dev"]