FROM node:20-alpine

# Instalar herramientas del sistema para manejar SMB/CIFS si se necesita
RUN apk add --no-cache tzdata

WORKDIR /usr/src/app

# Copiar solo manifiestos primero para aprovechar caché de Docker
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm install --omit=dev

# Copiar el resto del código (respeta .dockerignore)
COPY . .

EXPOSE 3000

CMD ["node", "api_server.js"]
