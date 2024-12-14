const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('./protos/career.proto');
const careerProto = grpc.loadPackageDefinition(packageDefinition).career;

const careers = [
  { id: '1', name: 'Ingeniería en Sistemas' },
  { id: '2', name: 'Administración de Empresas' }
];

function ListCareers(call, callback) {
  callback(null, { careers });
}

function GetCareer(call, callback) {
  const career = careers.find(c => c.id === call.request.id);
  if (career) {
    callback(null, career);
  } else {
    callback({ code: grpc.status.NOT_FOUND, message: 'Carrera no encontrada' });
  }
}

const server = new grpc.Server();
server.addService(careerProto.CareerService.service, { ListCareers, GetCareer });
server.bindAsync('localhost:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('Servidor gRPC escuchando en el puerto 50051');
});
