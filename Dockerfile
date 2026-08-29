# syntax=docker/dockerfile:1

# ---- deps: install node_modules from lockfile ----
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- builder: compile the Next app ----
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# NEXT_PUBLIC_* is inlined at build time — must be present here, not at runtime.
ARG NEXT_PUBLIC_API_BASE=https://api.kratos-energy.com/api/v1
ENV NEXT_PUBLIC_API_BASE=$NEXT_PUBLIC_API_BASE
# Canonical origin. Anything other than the production URL makes the build
# non-indexable, so staging images must override this.
ARG NEXT_PUBLIC_SITE_URL=https://kratos-energy.com
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
ENV NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=$NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
# GTM container. Defaults to the live container; pass an EMPTY value to build a
# staging image with no tag manager at all.
ARG NEXT_PUBLIC_GTM_ID=GTM-5RR9ZRTC
ENV NEXT_PUBLIC_GTM_ID=$NEXT_PUBLIC_GTM_ID
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---- runner: minimal image running the standalone server ----
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
