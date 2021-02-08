const { v4: uuid } = require('uuid');
const fakeProduct = require('./fakeProduct');

const fakeProductsList = (totalNumber) => {
  return Array.from(new Array(totalNumber)).map(() => ({
    id: uuid(),
    ...fakeProduct({ cached: false })
  }));
};

module.exports = fakeProductsList;
