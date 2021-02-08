const makeGetProductsRepository = ({ productDb }) => {
  return async ({ page, perPage }) => {
    const limit = parseInt(perPage, 10);
    const offset = (parseInt(page, 10) - 1) * limit;
    const products = await productDb.findAll({
      offset,
      limit
    });
    return products.map((product) => product.dataValues);
  };
};

module.exports = makeGetProductsRepository;
