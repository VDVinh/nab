const processingEntries = require('./processingEntries');

const makeReadFromStream = ({ redisClient }) => ({ controller }) => {
  redisClient.createGroupForProductStream();
  const readFromStream = async ({ count }) => {
    const pendingEntries = await redisClient.readFromPending();
    if (pendingEntries && pendingEntries[0][1].length > 0) {
      return processingEntries({
        entries: pendingEntries,
        controller
      });
    }
    const entries = await redisClient.readNewEntries({ count });
    return processingEntries({
      entries,
      controller
    });
  };
  return readFromStream;
};

module.exports = makeReadFromStream;
