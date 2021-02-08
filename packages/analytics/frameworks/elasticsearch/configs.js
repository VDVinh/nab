const elasticSearchConfigs = {
  development: {
    node: process.env.ELASTIC_SEARCH_URL || 'http://localhost:9200'
  },
  test: {
    node: process.env.ELASTIC_SEARCH_URL || 'http://localhost:9200'
  },
  production: {
    node: process.env.ELASTIC_SEARCH_URL
  }
};

const loadConfigs = () =>
  elasticSearchConfigs[process.env.NODE_ENV || 'development'];
module.exports = loadConfigs;
