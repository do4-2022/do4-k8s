FROM node:16-alpine
ENV REDIS_URL redis://localhost:6379
ENV POSTGRESQL_HOST localhost
ENV POSTGRESQL_DATABASE count
ENV POSTGRESQL_USER count
ENV POSTGRESQL_PASSWORD count
WORKDIR /app
COPY package-lock.json package.json index.js /app/
RUN npm ci
ENTRYPOINT [ "npm", "run", "start" ]