const fakeProductsList = require('../../faker/fakeProductsList');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hasData = await queryInterface.rawSelect('Products', {}, ['id']);
    if (!hasData) {
      const products = fakeProductsList(100);
      return queryInterface.bulkInsert('Products', products);
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products');
  }
};
