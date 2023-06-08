FROM node:16-alpine
ENV MS_URL http://localhost:3001
RUN npm ci
ENTRYPOINT [ "npm", "run", "start" ]