'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Courses', [
      {
        name:"Gramática",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Redação",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Courses', null, {});
  }
};
