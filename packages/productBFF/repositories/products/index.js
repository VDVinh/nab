const path = require('path');
const makeGetProductsRepository = require('./getProductsGrpcRepository');

const makeGrpcClient = require('../../frameworks/grpc/grpcClient');

const serverURI = process.env.GRPC_SERVER_URI || '0.0.0.0:50051';

const grpcClient = makeGrpcClient({
  protoPath: path.join(__dirname, '../../protoFiles/product.proto'),
  serverURI
});
console.log(`Setup grpcClient to: ${serverURI}`);

const getProductsRepository = makeGetProductsRepository({ grpcClient });
module.exports = { getProductsRepository };
