# Usa la imagen oficial de Node.js
FROM node:20

# Configura el directorio de trabajo
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del microservicio
COPY . .

# Expone el puerto en el que corre el microservicio
EXPOSE 3002

# Comando para iniciar el microservicio
CMD ["node", "index.js"]
