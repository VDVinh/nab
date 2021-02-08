const { expect } = require('chai');

const makeProduct = require('../../entities/product');

const DEFAULT_PRODUCT_FIELDS = {
  name: 'Default Name',
  price: 100,
  branch: 'Default Branch',
  color: 'Default Color'
};
const makeMissingField = (field) => ({
  ...DEFAULT_PRODUCT_FIELDS,
  [field]: null
});

const expectRaiseErrorOnMissingField = (fieldName) => {
  it(`should raise error if missing ${fieldName}`, () => {
    const missingName = makeMissingField(fieldName);
    expect(() => makeProduct(missingName)).to.throw(`${fieldName} is required`);
  });
};

const testAllFieldsMissing = () => {
  const fields = ['name', 'price', 'branch', 'color'];
  fields.map((field) => expectRaiseErrorOnMissingField(field));
};

const testMustBeStringOn = (fieldName) => {
  it(`should raise error if ${fieldName} is not a string`, () => {
    const nonStringNameProduct = {
      ...DEFAULT_PRODUCT_FIELDS,
      [fieldName]: 100
    };
    expect(() => makeProduct(nonStringNameProduct)).to.throw(
      `${fieldName} should be a string`
    );
  });
};

const testAllStringFields = () => {
  const fields = ['name', 'branch', 'color'];
  fields.map((field) => testMustBeStringOn(field));
};

describe('product Entity', () => {
  testAllFieldsMissing();
  testAllStringFields();

  it('should raise error if price is negative', () => {
    const negativePriceProduct = { ...DEFAULT_PRODUCT_FIELDS, price: -100 };
    expect(() => makeProduct(negativePriceProduct)).to.throw('non-negative');
  });

  it('should raise error if price is not number', () => {
    const invalidPrice = { ...DEFAULT_PRODUCT_FIELDS, price: 'abc' };
    expect(() => makeProduct(invalidPrice)).to.throw('price');
  });
});
