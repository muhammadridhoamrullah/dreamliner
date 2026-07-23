# STAGE 1: Deps
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# STAGE 2: Runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy node_modules dari stage deps
COPY --from=deps /app/node_modules ./node_modules

# Copy seluruh isi code
COPY . .

# Buat folder logs (winston-daily-rotate-file butuh ini)
RUN mkdir -p logs

# Buat user non-root
RUN addgroup -S nodejs && adduser -S dreamliner -G nodejs
RUN chown -R dreamliner:nodejs /app

USER dreamliner

EXPOSE 3000

# Copy kedua entrypoint script (app & worker)
COPY --chown=dreamliner:nodejs entrypoint.sh ./entrypoint.sh
COPY --chown=dreamliner:nodejs entrypoint-worker.sh ./entrypoint-worker.sh
RUN chmod +x ./entrypoint.sh ./entrypoint-worker.sh

# Default entrypoint = app (di-override di docker-compose.yml untuk worker)
ENTRYPOINT [ "./entrypoint.sh" ]