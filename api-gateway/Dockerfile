# Usar una imagen base de Node.js
FROM node:20

# Crear un directorio de trabajo
WORKDIR /usr/src/app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código de la aplicación
COPY . .

# Exponer el puerto que usa la API Gateway
EXPOSE 4000

# Comando para iniciar la aplicación
CMD ["node", "index.js"]
