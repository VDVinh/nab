const makeServer = require('./frameworks/grpc/grpcServer');
const { getProductsController } = require('./controllers/products/index');

const services = { getAll: getProductsController };

const port = process.env.GRPC_SERVER_PORT;

process.on('uncaughtException', (err, origin) => {
  console.error(`Caught exception: ${err}\n Exception origin: ${origin}`);
  process.exit(1);
});
const server = makeServer({ serverURI: `0.0.0.0:${port}`, services });
const stopServer = () =>
  server.tryShutdown(() => console.log('Grpc server shut down'));
module.exports = stopServer;
