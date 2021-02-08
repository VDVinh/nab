const makeGetProductsController = ({ logActivity }) => ({ getProducts }) => {
  const getProductsController = async (req = { query: {} }) => {
    try {
      const { ipAddress, userAgent, originalUrl: url } = req;
      await logActivity({ ipAddress, userAgent, url });
    } catch (e) {
      console.error('failed on trying to Log getProducts activity');
      console.error(e.stack);
    }
    try {
      const { page = 1, perPage = 10 } = req.query;
      const products = await getProducts({
        page: parseInt(page, 10),
        perPage: parseInt(perPage, 10)
      });
      return {
        data: products || [],
        statusCode: 200
      };
    } catch (e) {
      console.error(e.stack);
      return {
        error: e.message,
        statusCode: 400
      };
    }
  };
  return getProductsController;
};

module.exports = makeGetProductsController;
