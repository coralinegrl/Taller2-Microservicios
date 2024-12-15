const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.resolve(__dirname, '../../../CareersMicroservice/protos/career.proto');


const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const careerProto = grpc.loadPackageDefinition(packageDefinition).career;
const client = new careerProto.CareerService(
    'localhost:50051',
    grpc.credentials.createInsecure()
);

module.exports = client;
