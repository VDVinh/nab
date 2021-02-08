const makeGetProductsController = ({ getProductsInteractor }) => {
  const getProductsController = async (res) => {
    try {
      const products = await getProductsInteractor(res.request);
      products.forEach((product) => res.write(product));
      res.end();
    } catch (e) {
      console.error(e.stack);
      res.emit('error', { message: 'Error on getting Products' });
    }
  };
  return getProductsController;
};

module.exports = makeGetProductsController;
