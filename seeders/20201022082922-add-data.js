'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      { title: 'asdasd', author: 'asodiwqd qwidnqowd', released_year: 1203, createdAt: new Date(), updatedAt: new Date() }
    ]
    return queryInterface.bulkInsert('Books', data)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null)
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
