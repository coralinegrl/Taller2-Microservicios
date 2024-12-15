 
# Utiliza una imagen oficial de Node.js
FROM node:20

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto en el que corre el microservicio
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["node", "index.js"]
