const makeAddActivityRepository = ({ elasticSearchClient, redisClient }) => {
  const addActivityRepository = async (activity) => {
    const response = await elasticSearchClient.addActivity(activity);
    await redisClient.ackEntry(activity.id);
    return response;
  };
  return addActivityRepository;
};

module.exports = makeAddActivityRepository;
