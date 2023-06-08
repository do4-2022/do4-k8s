FROM node:16-alpine
ENV MS_URL http://localhost:3001
WORKDIR /app
COPY package-lock.json package.json index.js /app/
RUN npm ci
ENTRYPOINT [ "npm", "run", "start" ]