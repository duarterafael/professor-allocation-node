'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Professors', [
      {
        name:"Martha Santos",
        cpf:"70557262470",
        department_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Ricardo Silva",
        cpf:"01856933423",
        department_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Professors', null, {});
  }
};
