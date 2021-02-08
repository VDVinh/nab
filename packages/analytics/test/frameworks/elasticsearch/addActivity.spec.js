const { expect } = require('chai');
const makeESClient = require('../../../frameworks/elasticsearch/client');
const loadConfigs = require('../../../frameworks/elasticsearch/configs');

const { searchBy, removeAllDocuments, addActivity } = makeESClient(
  loadConfigs()
);
const fakeActivity = require('../faker/fakeActivity');

const ACTIVITY_ACTION = 'get-products-list1';
const INDEX = ACTIVITY_ACTION;

const generateTwoActivities = () => [
  fakeActivity({ action: ACTIVITY_ACTION }),
  fakeActivity({ action: ACTIVITY_ACTION })
];
const addIndex = () => addActivity(fakeActivity({ action: ACTIVITY_ACTION }));

describe('Elasticsearch: addActivity', () => {
  beforeEach(async () => {
    await addIndex();
    await removeAllDocuments({ index: INDEX });
  });
  it('should index the document', async () => {
    const activities = generateTwoActivities();
    const beforeAdd = await searchBy({ index: INDEX });
    await Promise.all(activities.map(addActivity));
    const afterAdd = await searchBy({ index: INDEX });
    expect(afterAdd.length).to.equal(beforeAdd.length + 2);
  });

  it('should index the document idempotently', async () => {
    const activities = generateTwoActivities();
    const sameIdActivities = activities.map((activity) => ({
      ...activity,
      id: 'identical-id'
    }));
    const beforeAdd = await searchBy({ index: INDEX });
    await Promise.all(sameIdActivities.map(addActivity));
    const afterAdd = await searchBy({ index: INDEX });
    expect(afterAdd.length).to.equal(beforeAdd.length + 1);
  });
});
