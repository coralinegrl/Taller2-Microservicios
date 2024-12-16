# api-gateway Dockerfile
FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Copiar el archivo .proto necesario
COPY ./CareersMicroservice/protos/career.proto /usr/src/CareersMicroservice/protos/career.proto

COPY . .

EXPOSE 4001

CMD ["node", "api-gateway/index.js"]
