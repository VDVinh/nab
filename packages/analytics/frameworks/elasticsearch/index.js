const makeClient = require('./client');
const loadConfigs = require('./configs');

const configs = loadConfigs();

const client = makeClient(configs);
module.exports = client;
