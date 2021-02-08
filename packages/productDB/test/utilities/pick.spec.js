const { expect } = require('chai');
const pick = require('../../utilities/pick');

describe('utilities pick', () => {
  it('should pick specified key from object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const keys = ['a', 'c'];
    expect(pick(obj, keys)).to.deep.equal({ a: 1, c: 3 });
  });

  it('should return empty if the object is empty', () => {
    const obj = {};
    const keys = ['a', 'c'];
    expect(pick(obj, keys)).to.be.empty;
  });

  it('should return empty if the keys is empty', () => {
    const obj = {};
    const keys = [];
    expect(pick(obj, keys)).to.be.empty;
  });

  it('should handle if the key is null', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const keys = null;
    expect(pick(obj, keys)).to.be.empty;
  });

  it('should handle if the obj is null', () => {
    const obj = null;
    const keys = [];
    expect(pick(obj, keys)).to.be.empty;
  });
});
