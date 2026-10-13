# ---- Etapa 1: Dependencias ----
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# ---- Etapa 2: Constructor ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Deshabilita la telemetría de Next.js durante la construcción
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# ---- Etapa 3: Producción ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Crea un usuario no-root para mayor seguridad
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia los archivos estáticos de la salida standalone
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Copia la carpeta standalone generada
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

USER nextjs

EXPOSE 3000
ENV PORT 3000

# El servidor de Next.js en modo standalone se ejecuta con este comando
CMD ["node", "server.js"]