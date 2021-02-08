const makeGetProductsInteractor = ({ getProductsRepository }) => {
  return async (pagination) => {
    const products = await getProductsRepository(pagination);
    return products;
  };
};

module.exports = makeGetProductsInteractor;
