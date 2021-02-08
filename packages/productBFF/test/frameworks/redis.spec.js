const { expect } = require('chai');
const { addActivity, getLength } = require('../../frameworks/redis');

describe('redis client', () => {
  it('can add new entry to redis server', async () => {
    const lengthBeforeAdd = await getLength();
    const activity = { a: 1, b: 2, c: 3 };
    await addActivity(activity);
    const lengthAfterAdd = await getLength();
    expect(lengthAfterAdd).to.equal(lengthBeforeAdd + 1);
  });
});
