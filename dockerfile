FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS dev
COPY . .
EXPOSE 3000
CMD ["sh", "-c", "npx drizzle-kit migrate --config=drizzle.config.ts && pnpm dev"]

FROM base AS prod
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["sh", "-c", "npx drizzle-kit migrate --config=drizzle.config.ts && node dist/server.js"]
