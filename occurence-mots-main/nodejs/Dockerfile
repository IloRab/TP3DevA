FROM node:lts-bullseye-slim
LABEL authors="Laurent"
WORKDIR /usr/src/app
COPY package.json package.json ./
RUN npm install --omit=dev && npm cache clean --force
COPY . .
EXPOSE 5432
CMD ["node", "src/server.js"]