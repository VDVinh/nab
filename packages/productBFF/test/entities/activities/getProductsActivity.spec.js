const { expect } = require('chai');
const getProductsActivity = require('../../../entities/activities/products/getProductsActivity');

const ISO_STRING_REGEX = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;

describe('get Products Activity', () => {
  it('have expected fields', () => {
    const activity = getProductsActivity();
    expect(activity.action).to.equal('get-products-list');
    expect(activity.url).to.equal('/products');
    expect(activity.httpMethod).to.equal('GET');
    expect(activity.time).to.be.a.string;
    const matchISOString = activity.time.match(ISO_STRING_REGEX);
    expect(matchISOString).to.not.be.empty;
  });
});
