FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm i --omit=dev
COPY . .
EXPOSE 4001
CMD ["node", "server.js"]