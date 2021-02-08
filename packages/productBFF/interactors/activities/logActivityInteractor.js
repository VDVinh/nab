const makeLogActivityInteractor = (activity) => ({
  logActivityRepository
}) => ({ ipAddress, userAgent, url } = {}) => {
  return logActivityRepository({
    ...activity,
    ipAddress,
    url,
    userAgent
  });
};

module.exports = makeLogActivityInteractor;
