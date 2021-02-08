const fs = require('fs');
const { forever } = require('async');
const { readFromRedisStreamTo } = require('./frameworks/redis');

const { addActivityController } = require('./controllers/activities');

const readFromRedisStreamToController = readFromRedisStreamTo({
  controller: addActivityController
});

const READ_COUNT = 100;

process.on('uncaughtException', (err, origin) => {
  fs.writeSync(
    process.stderr.fd,
    `Caught exception: ${err}\n Exception origin: ${origin}`
  );
  process.exit(1);
});

process.on('SIGINT', () => process.exit(1));

forever(
  (next) => {
    readFromRedisStreamToController({ count: READ_COUNT });
    setTimeout(next, 5);
  },
  (error) => console.error(error.stack)
);
console.log('start to listen to Redis Stream');
