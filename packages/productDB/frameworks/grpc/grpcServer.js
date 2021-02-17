const fs = require('fs');
const path = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = path.join(__dirname, '../../protoFiles/product.proto');
const { CA_CERT_FILE, SERVER_KEY_FILE, SERVER_CERT_FILE } = process.env;

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
};

let credentials;
if (process.env.GRPC_SSL_STATUS === 'enabled') {
  credentials = grpc.ServerCredentials.createSsl(
    fs.readFileSync(CA_CERT_FILE),
    [
      {
        private_key: fs.readFileSync(SERVER_KEY_FILE),
        cert_chain: fs.readFileSync(SERVER_CERT_FILE)
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
