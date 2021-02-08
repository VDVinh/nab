const { Client } = require('@elastic/elasticsearch');

const makeEntry = (activity) => {
  const { id } = activity;
  const index = activity.action;
  if (id) return { body: activity, id, index };
  return { body: activity, index };
};

const makeElasticSearchClient = (configs) => {
  const client = new Client(configs);
  const removeAllDocuments = async ({ index }) => {
    await client.deleteByQuery({
      index,
      body: { query: { match_all: {} } }
    });
  };

  const searchBy = async ({ index, conditions = { match_all: {} } }) => {
    await client.indices.refresh({ index });
    const result = await client.search({
      index,
      body: { query: conditions }
    });
    return result.body.hits.hits;
  };

  const addActivity = async (activity) => {
    const entry = makeEntry(activity);
    await client.index(entry);
  };
  return { client, removeAllDocuments, searchBy, addActivity };
};

module.exports = makeElasticSearchClient;
