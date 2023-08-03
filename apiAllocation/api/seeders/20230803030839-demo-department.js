'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Departments', [
    {
      name:"Português",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name:"História",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name:"Geografia",
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Departments', null, {});
  }
};
