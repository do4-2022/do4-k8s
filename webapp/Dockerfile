# base node image
FROM node:16-bullseye-slim

WORKDIR /app
COPY . /app

ENV NODE_ENV=production
RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]