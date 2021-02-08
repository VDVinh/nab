const { runServer } = require('./frameworks/express/routes');

const port = process.env.PORT || 3000;

process.on('uncaughtException', (err, origin) => {
  console.log(`Caught exception: ${err}\n Exception origin: ${origin}`);
  process.exit(1);
});

console.log('GRPC_SERVER_URI', process.env.GRPC_SERVER_URI);

runServer({ port });
