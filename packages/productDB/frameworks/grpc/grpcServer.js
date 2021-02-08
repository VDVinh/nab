const fs = require('fs');
const path = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = path.join(__dirname, '../../protoFiles/product.proto');

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
};

let credentials;
if (process.env.GRPC_SSL_ENABLE) {
  credentials = grpc.ServerCredentials.createSsl(
    fs.readFileSync('./certs/ca.crt'),
    [
      {
        private_key: fs.readFileSync('./certs/server.key'),
        cert_chain: fs.readFileSync('./certs/server.crt')
      }
    ],
    true
  );
} else {
  credentials = grpc.ServerCredentials.createInsecure();
}

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const { ProductService } = grpc.loadPackageDefinition(
  packageDefinition
).product;

const makeServer = ({ services, serverURI }) => {
  const server = new grpc.Server();
  const { getAll } = services;
  server.addService(ProductService.service, { getAll });
  server.bind(serverURI, credentials);
  server.start();
  console.log(`started server at: ${serverURI}`);
  return server;
};

module.exports = makeServer;
