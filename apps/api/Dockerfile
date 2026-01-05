FROM node:24-alpine
WORKDIR /app
ENV ASD_PORT=80
EXPOSE 80

COPY package*.json ./
RUN npm ci --omit=dev

COPY ./dist/server.js .

CMD ["node", "server.js"]