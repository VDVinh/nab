const makeGetProductsInteractor = ({ getProductsRepository }) => {
  const getProductsInteractor = async (pagination = {}) => {
    const products = await getProductsRepository(pagination);
    return products;
  };
  return getProductsInteractor;
};

module.exports = makeGetProductsInteractor;
