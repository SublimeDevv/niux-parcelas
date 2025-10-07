# -----------------------
# Etapa 1: Dependencias base
# -----------------------
FROM node:22-alpine AS base
WORKDIR /app
# Instala dependencias necesarias para compilar paquetes nativos
RUN apk add --no-cache libc6-compat

# Copiamos los archivos de dependencias
COPY package*.json ./

# -----------------------
# Etapa 2: Dependencias y Build
# -----------------------
FROM base AS builder

# Instalamos todas las dependencias (incluyendo dev)
RUN npm ic

# Copiamos el resto del código
COPY . .

# Generamos la build optimizada de producción
RUN npx prisma generate
RUN npm run build

# -----------------------
# Etapa 3: Producción (ligera)
# -----------------------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Evita el uso de telemetría
ENV NEXT_TELEMETRY_DISABLED 1

# Copiamos solo lo necesario para ejecutar
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Next.js escucha en el puerto 3000 por defecto
EXPOSE 3000

# Comando de ejecución
CMD ["npm", "start"]
