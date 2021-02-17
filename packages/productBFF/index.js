const { runServer } = require('./frameworks/express/routes');

const port = process.env.PORT || 3000;

process.on('uncaughtException', (err, origin) => {
  console.log(`Caught exception: ${err}\n Exception origin: ${origin}`);
  process.exit(1);
});

runServer({ port });
