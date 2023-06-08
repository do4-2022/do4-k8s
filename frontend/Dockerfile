FROM node:16-alpine AS build
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16-alpine AS prod
WORKDIR /prod
COPY --from=build /app/build /prod
RUN npm install --global serve
EXPOSE 3000
CMD ["serve", "-l", "3000", "/prod"]
