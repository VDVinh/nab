const makeProduct = (attributes = {}) => {
  const { name, price, branch, color } = attributes;
  if (!name) throw new Error('name is required');
  if (!price) throw new Error('price is required');
  if (!branch) throw new Error('branch is required');
  if (!color) throw new Error('color is required');

  if (typeof name !== 'string') throw new Error('name should be a string');
  if (typeof price !== 'number') throw new Error('price should be a number');
  if (typeof branch !== 'string') throw new Error('branch should be a string');
  if (typeof color !== 'string') throw new Error('color should be a string');

  if (price < 0) throw new Error('price should be a non-negative number');

  const integerPrice = parseInt(price, 10);

  return Object.freeze({
    name,
    price: integerPrice,
    branch,
    color
  });
};

module.exports = makeProduct;
