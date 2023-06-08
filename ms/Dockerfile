# Utilise une image de base contenant Node.js
FROM node:14

# Crée un répertoire de travail dans le conteneur
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]