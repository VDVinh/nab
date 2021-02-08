const { expect } = require('chai');
const EventEmitter = require('events');
const MemoryStream = require('memorystream');

const memStream = new MemoryStream([]);
const makeGetProductsController = require('../../../controllers/products/getProductsController');

const FAKE_INTERACTOR_RESPONSE = ['a', 'b', 'c'];

const getProductsInteractor = () => FAKE_INTERACTOR_RESPONSE;
const ERROR_FROM_INTERACTOR = 'interactor error';
const getProductsInteractorWithError = () => {
  throw new Error(ERROR_FROM_INTERACTOR);
};

describe('getProducts Controller', () => {
  it('should call the interactor', (done) => {
    const getProductsController = makeGetProductsController({
      getProductsInteractor
    });
    getProductsController(memStream);
    const data = [];
    memStream.on('data', (chunk) => data.push(chunk.toString()));
    memStream.on('end', () => {
      expect(data).to.deep.equal(FAKE_INTERACTOR_RESPONSE);
      done();
    });
  });

  it('should handle the error from the interactor', (done) => {
    const getProductsController = makeGetProductsController({
      getProductsInteractor: getProductsInteractorWithError
    });
    const errorStream = new EventEmitter();
    errorStream.on('error', (err) => {
      expect(err.message).to.include('Error');
      done();
    });
    getProductsController(errorStream);
  });
});
