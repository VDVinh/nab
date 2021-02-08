const makeGetProductsGrpcRepository = ({ grpcClient }) => {
  const defaultPagination = { page: 1, perPage: 10 };
  const getProductsGrpcRepository = async (pagination = defaultPagination) => {
    const data = [];
    const receivingProducts = await grpcClient.getAll(pagination);
    const finalData = await new Promise((resolve, reject) => {
      receivingProducts.on('data', (oneProduct) => data.push(oneProduct));
      receivingProducts.on('end', () => resolve(data));
      receivingProducts.on('error', reject);
    });
    return finalData;
  };
  return getProductsGrpcRepository;
};

module.exports = makeGetProductsGrpcRepository;
