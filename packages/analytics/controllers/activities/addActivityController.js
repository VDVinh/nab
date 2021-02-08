const makeAddActivityController = ({ addActivityInteractor }) => {
  const addActivityController = async (activity) => {
    try {
      await addActivityInteractor(activity);
      return true;
    } catch (e) {
      console.error(e.stack);
      return false;
    }
  };
  return addActivityController;
};

module.exports = makeAddActivityController;
