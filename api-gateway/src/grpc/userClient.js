const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Cargar el archivo .proto
const PROTO_PATH = path.join(__dirname, '../../proto/user.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const userProto = grpc.loadPackageDefinition(packageDefinition).user;
const client = new userProto.UserService('localhost:50051', grpc.credentials.createInsecure());

// Método para hacer solicitudes a UserService
exports.makeRequest = (method, data, callback) => {
  if (!client[method]) {
    return callback(new Error(`El método ${method} no existe en UserService`));
  }

  client[method](data, callback);
};
