const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;
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
      const { page, perPage } = req.query;
      const products = await getProducts({
        page: parseInt(page, 10) || DEFAULT_PAGE,
        perPage: parseInt(perPage, 10) || DEFAULT_PER_PAGE
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
