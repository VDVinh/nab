const makeGetProductsActivity = () => {
  const action = 'get-products-list';
  const url = '/products';
  const httpMethod = 'GET';
  const time = new Date().toISOString();
  return { action, url, httpMethod, time };
};

module.exports = makeGetProductsActivity;
