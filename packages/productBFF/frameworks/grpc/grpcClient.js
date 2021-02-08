const fs = require('fs');
const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');

const PROTO_PATH = path.join(__dirname, '../../protoFiles/product.proto');

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
};

let credentials;
let grpcOptions;
if (process.env.GRPC_SSL_ENABLE) {
  credentials = grpc.credentials.createSsl(
    fs.readFileSync('./certs/ca.crt'),
    fs.readFileSync('./certs/client.key'),
    fs.readFileSync('./certs/client.crt')
  );
  grpcOptions = {
    'grpc.ssl_target_name_override': 'localhost',
    'grpc.default_authority': 'localhost'
  };
} else {
  credentials = grpc.credentials.createInsecure();
}

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const { ProductService } = grpc.loadPackageDefinition(
  packageDefinition
).product;

const makeClient = ({ serverURI }) => {
  const client = new ProductService(serverURI, credentials, grpcOptions);
  return client;
};

module.exports = makeClient;
