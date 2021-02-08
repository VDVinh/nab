const makeAddActivityInteractor = ({ addActivityRepository }) => {
  const addActivity = async (activity) => {
    const response = await addActivityRepository(activity);
    return response;
  };
  return addActivity;
};

module.exports = makeAddActivityInteractor;
