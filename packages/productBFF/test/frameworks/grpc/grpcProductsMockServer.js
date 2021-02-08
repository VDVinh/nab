const path = require('path');
const { createMockServer } = require('grpc-mock');
const ALL_RESPONSES = require('./allResponses.js');

const toDateString = new Date().toISOString();
const insertingProduct = {
  id: 'insertingId',
  name: 'name',
  branch: 'abc',
  color: 'blue',
  price: 100,
  createdAt: toDateString,
  updatedAt: toDateString
};
const mockGetAllResponse = ({ page = 1, perPage = 10 }) =>
  ALL_RESPONSES[page].slice(0, perPage);

const makeStreamResponse = (data) =>
  data.reduce((result, product) => {
    result.push({ output: product });
    return result;
  }, []);

const makeMockProductsServer = () =>
  createMockServer({
    protoPath: path.join(__dirname, '../../../protoFiles/product.proto'),
    packageName: 'product',
    serviceName: 'ProductService',
    rules: [
      {
        method: 'getAll',
        input: { page: 1, perPage: 10 },
        streamType: 'server',
        stream: makeStreamResponse(mockGetAllResponse({ page: 1, perPage: 10 }))
      },
      {
        method: 'getAll',
        input: { page: 1, perPage: 2 },
        streamType: 'server',
        stream: makeStreamResponse(mockGetAllResponse({ page: 1, perPage: 2 }))
      },

      {
        method: 'get',
        input: { id: 'id1' },
        output: {
          id: 'id1',
          name: 'name',
          age: 20,
          address: 'address'
        }
      },

      {
        method: 'insert',
        input: insertingProduct,
        output: insertingProduct
      }
    ]
  });

module.exports = {
  makeMockProductsServer,
  mockGetAllResponse,
  insertingProduct
};
