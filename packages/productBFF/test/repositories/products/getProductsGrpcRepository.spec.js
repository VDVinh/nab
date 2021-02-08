const { expect } = require('chai');
const { Readable } = require('stream');
const makeGetProductsGrpcRepository = require('../../../repositories/products/getProductsGrpcRepository');

const data = [[], ['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']];
const grpcClient = {
  getAll: ({ page, perPage } = {}) =>
    Readable.from(data[page].slice(0, perPage))
};

const getProductsGrpcRepository = makeGetProductsGrpcRepository({
  grpcClient
});

describe('getProducts Repository', () => {
  it('can get Products without pagination', async () => {
    const response = await getProductsGrpcRepository();
    expect(response).to.deep.equal(data[1]);
  });

  it('can get Products using pagination', async () => {
    const response = await getProductsGrpcRepository({
      page: 2,
      perPage: 2
    });

    expect(response).to.deep.equal(['d', 'e']);
  });
});
