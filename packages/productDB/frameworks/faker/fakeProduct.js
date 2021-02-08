const faker = require('faker');

const DEFAULT_PRODUCT = {
  color: 'pink',
  name: 'Handcrafted Granite Mouse',
  price: 689,
  branch: 'Beauty',
  createdAt: new Date('2021-01-24T23:08:02.264Z'),
  updatedAt: new Date('2021-01-24T23:08:02.264Z')
};

const fakeProduct = ({ cached = true } = {}) => {
  if (cached) return DEFAULT_PRODUCT;
  const date = faker.date.past();
  return {
    color: faker.commerce.color(),
    name: faker.commerce.productName(),
    branch: faker.commerce.department(),
    price: parseInt(faker.commerce.price(), 10),
    createdAt: date,
    updatedAt: date
  };
};

module.exports = fakeProduct;
