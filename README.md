# Taller2-Microservicios

User Management Microservice
📘 Descripción General
Este microservicio de gestión de usuarios permite manejar operaciones relacionadas con los perfiles de usuario. Se ha probado utilizando Apache JMeter para evaluar el rendimiento con distintas cargas de usuarios. Además, se realizaron pruebas de funcionalidad usando Postman.

🚀 Funcionalidades Principales
Obtener Perfil de Usuario (GetProfile)

Protocolo: gRPC
Descripción: Recupera la información del perfil de un usuario, su progreso académico y los datos asociados.
Gestión de Usuarios

Crear usuario (CreateUser)
Actualizar usuario (UpdateProfile)
Obtener perfil (GetProfile)
Obtener progreso (GetMyProgress)
Actualizar progreso (UpdateMyProgress)


⚙️ Pruebas Realizadas
🕹️ Pruebas de Rendimiento (JMeter)

Se ejecutaron pruebas de rendimiento simulando diferentes cantidades de usuarios simultáneos: 1, 5, 10, 50, 100, 500, 750, 1000, 2000, 5000 y 10000.

📜 Comando de Ejecución
bash
Copiar código
jmeter -n -t test-grpc.jmx -l test_results.jtl -Jusers=<NÚMERO_DE_USUARIOS>
📋 Requisitos Previos
Node.js (v16 o superior)
Docker y Docker Compose
PostgreSQL (a través de Docker)
Apache JMeter
Sequelize CLI (para ejecutar migraciones)
🔥 Cómo Ejecutar el Proyecto
1️⃣ Clonar el Repositorio
bash
Copiar código
git clone <URL_DEL_REPOSITORIO>
cd user-management
2️⃣ Instalar Dependencias del Proyecto
Asegúrate de instalar las dependencias necesarias para Node.js y Sequelize CLI.

npm install
npx sequelize-cli init
3️⃣ Levantar PostgreSQL con Docker
Para configurar la base de datos se usa un contenedor Docker con PostgreSQL.

docker-compose up -d
Este comando levantará un contenedor con PostgreSQL corriendo en el puerto 5432.
Si necesitas personalizarlo, aquí tienes un ejemplo de archivo docker-compose.yml:

📜 Archivo docker-compose.yml

version: '3.8'

services:
  db:
    image: postgres:latest
    container_name: user_management_db
    environment:
      POSTGRES_USER: user_management
      POSTGRES_PASSWORD: user_management
      POSTGRES_DB: user_management
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:


4️⃣ Ejecutar Migraciones con Sequelize CLI
Una vez que el contenedor está corriendo, aplica las migraciones para crear las tablas necesarias en la base de datos.


npx sequelize-cli db:migrate

Este comando usará las migraciones creadas en la carpeta migrations/ y se encargará de crear automáticamente las tablas. No necesitas ejecutar comandos SQL manualmente.

📜 Estructura de la carpeta del proyecto
arduino
Copiar código
📁 user-management/
 ┣ 📁 config/          // Archivo de configuración de Sequelize (config.js)
 ┣ 📁 migrations/      // Migraciones de Sequelize
 ┣ 📁 models/          // Modelos de Sequelize (User, Progress, etc.)
 ┣ 📁 src/
 ┃ ┣ 📁 grpc/         // Configuración del servidor gRPC
 ┃ ┣ 📁 controllers/  // Controladores de gRPC
 ┃ ┣ 📁 routes/       // Rutas de la API Gateway
 ┣ 📄 docker-compose.yml
 ┣ 📄 README.md
 ┣ 📄 package.json

 
5️⃣ Iniciar el Servidor gRPC
Para levantar el servidor gRPC que ejecuta todos los servicios de User Management, utiliza el siguiente comando:

node src/grpc/server.js

El servidor escuchará en localhost:50051. Asegúrate de que no tengas bloqueado ese puerto o en uso por otra aplicación.

6️⃣ Probar el Servicio
Para probar que todo esté funcionando correctamente, tienes dos opciones:

Manual con Postman

Configura Postman para realizar llamadas gRPC al servidor en la URL 127.0.0.1:50051.
Realiza pruebas de cada uno de los métodos (CreateUser, GetProfile, etc.).
Automático con JMeter

Ejecuta el plan de pruebas de JMeter:

jmeter -n -t GetProfile.jmx -l test_results.jtl -Jusers=500


🧪 Evidencias Adjuntas


📚 Comandos Útiles

docker-compose up -d	Levanta el contenedor de PostgreSQL
npx sequelize-cli db:migrate	Ejecuta las migraciones con Sequelize

node src/grpc/server.js	Inicia el servidor gRPC

docker exec -it user_management_db psql -U user_management -d user_management	Abre la consola de PostgreSQL


👨‍💻 Estructura del Proyecto


📁 user-management/
 ┣ 📁 config/
 ┃ ┗ 📜 config.js              # Configuración de la base de datos (Sequelize)
 ┣ 📁 migrations/
 ┃ ┗ 📜 20241213163834-create-users.js  # Migración para la tabla Users
 ┣ 📁 models/
 ┃ ┣ 📜 User.js                 # Modelo Sequelize para "User"
 ┃ ┗ 📜 Progress.js             # Modelo Sequelize para "Progress"
 ┣ 📁 src/
 ┃ ┣ 📁 grpc/
 ┃ ┃ ┗ 📜 server.js            # Configuración del servidor gRPC
 ┃ ┣ 📁 controllers/
 ┃ ┃ ┗ 📜 userController.js     # Lógica de los controladores de gRPC
 ┣ 📄 package.json             # Dependencias del proyecto
 ┣ 📄 docker-compose.yml       # Archivo de configuración Docker
 ┣ 📄 README.md                # Guía del proyecto


npx sequelize-cli db:migrate
Docker: Contenedor PostgreSQL configurado con un docker-compose.yml.

Servidor gRPC: Se levanta con:

node src/grpc/server.js



# 🔐 **AccessMicroservice**

Este microservicio gestiona el registro, inicio de sesión y actualización de contraseñas de los usuarios. Utiliza Node.js, Express, MongoDB y RabbitMQ.

---

## ⚙️ Configuración

### Variables de Entorno (`.env`)

Crea un archivo `.env` con las siguientes variables:

```env
PORT=3003
MONGODB_URL=mongodb://localhost:27018/access-db
JWT_SECRET=supersecretkey
RABBITMQ_URL=amqp://admin:admin@localhost:5672
```

### Instalar Dependencias
npm install
### Iniciar microservicio
node index.js


## Endpoints
Base URL: http://localhost:3003/auth
POST	/register	Registrar un nuevo usuario
POST	/login	Iniciar sesión
PUT	/update-password	Actualizar contraseña del usuario
POST	/logout	Cerrar sesión (revocar token)

# 📦 Dependencias Principales
Express: Framework para el servidor web.
Mongoose: ODM para MongoDB.
Bcrypt: Encriptación de contraseñas.
JWT: Autenticación mediante tokens.
RabbitMQ: Broker de mensajes para comunicación entre servicios.

# 🛠️ Tecnologías Utilizadas
Node.js
Express
MongoDB
RabbitMQ

## Construir y ejecutar con Docker
docker build -t access-microservice .
docker run -p 3003:3003 access-microservice

</details>

---

### 📄 APIGateway README


# 🌐 APIGateway

Este servicio actúa como puerta de enlace para enrutar solicitudes a los microservicios de acceso y carreras. Utiliza **Node.js**, **Express** y **http-proxy-middleware**.

---

## ⚙️ **Configuración**

### Variables de Entorno (`.env`)

Crea un archivo `.env` con las siguientes variables:

```env
PORT=4001
ACCESS_SERVICE_URL=http://localhost:3003
CAREERS_SERVICE_URL=http://localhost:3004
```

## Instalar dependencias
npm install
## Iniciar API
node index.js

## 📡 Endpoints
Base URL: http://localhost:4001

POST	/access/register	Proxy para registrar un usuario
POST	/access/login	Proxy para iniciar sesión
PUT	/access/update-password	Proxy para actualizar contraseña
POST	/access/logout	Proxy para cerrar sesión
GET	/careers	Proxy para obtener todas las carreras

## Dependencias Principales
Express: Framework para el servidor web.
http-proxy-middleware: Middleware para proxy de solicitudes.

## Tecnologías Utilizadas
Node.js
Express
http-proxy-middleware


## Docker
docker build -t api-gateway .
docker run -p 4001:4000 api-gateway



---

### 📄 **CareersMicroservice**

<details>
<summary>Haz clic para ver el contenido</summary>


# 🎓 **CareersMicroservice**

Este microservicio gestiona información sobre carreras universitarias. Utiliza **Node.js**, **Express**, **MongoDB** y **RabbitMQ**.

---

## ⚙️ **Configuración**

### Variables de Entorno (`.env`)

Crea un archivo `.env` con las siguientes variables:

```env
PORT=3004
MONGODB_URL=mongodb://localhost:27017/careers-db
RABBITMQ_URL=amqp://admin:admin@localhost:5672
```

Instalar dependencias:
npm install

Iniciar:
node index.js

## Endpoints
Base URL: http://localhost:3004/careers
GET	/	Obtener todas las carreras
POST	/	Crear una nueva carrera
GET	/:id	Obtener una carrera por su ID
PUT	/:id	Actualizar una carrera
DELETE	/:id	Eliminar una carrera

## Dependencias principales
Express: Framework para el servidor web.
Mongoose: ODM para MongoDB.
RabbitMQ: Broker de mensajes para comunicación entre servicios.

## Tecnologías utilizadas
Node.js
Express
MongoDB
RabbitMQ

## Docker
docker build -t careers-microservice .
docker run -p 3004:3004 careers-microservice




