# STAGE 1: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files dulu (layer caching)
COPY package*.json ./
RUN npm ci

# Terima build argument untuk VITE_API_URL
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Copy source code dan build
COPY . .
RUN npm run build

# STAGE 2: Runner (Nginx)
FROM nginx:alpine AS runner

# Copy hasil build dari stage builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config (untuk SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]