const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Cargar el archivo .proto
const PROTO_PATH = path.join(__dirname, '../../protos/user.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

const UserController = require('../controllers/userController');

// Crear servidor gRPC
const server = new grpc.Server();

server.addService(userProto.UserService.service, {
  CreateUser: UserController.createUserGRPC,
  GetProfile: UserController.getProfileGRPC,
  GetUser: UserController.getUserGRPC,
  GetMyProgress: UserController.getMyProgressGRPC,
  UpdateUser:UserController.updateUserGRPC,
  UpdateMyProgress: UserController.updateMyProgressGRPC,
  UpdateProfile: UserController.updateProfileGRPC,
  deleteUser:UserController.deleteUserGRPC,
  listUsers:UserController.listUsersGRPC,
  
});

const PORT = '50051';

server.bindAsync(`127.0.0.1:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
  console.log(`🟢 Servidor gRPC corriendo en el puerto ${PORT}`);
});