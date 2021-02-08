const faker = require('faker');

const fakeActivity = (attributes) => {
  const ipAddress = faker.internet.ip();
  const userAgent = faker.internet.userAgent();
  const action = 'get-products-list';
  const url = '/products';
  const httpMethod = 'GET';
  const time = new Date().toISOString();
  return { ipAddress, userAgent, action, url, httpMethod, time, ...attributes };
};

module.exports = fakeActivity;
