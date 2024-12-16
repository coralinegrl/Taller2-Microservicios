# AccessMicroservice Dockerfile
FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Instalar bcrypt dentro del contenedor
RUN npm install bcrypt --build-from-source

COPY . .

EXPOSE 3003

CMD ["node", "index.js"]
