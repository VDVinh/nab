const controllerWrapper = (controller) => async (req, res) => {
  const response = await controller(req);
  res.contentType('application/json');
  return res.status(response.statusCode).json(response.data);
};

module.exports = controllerWrapper;
