const makeLogActivityRepository = ({ redisClient }) => (data) =>
  redisClient.addActivity(data);

module.exports = makeLogActivityRepository;
