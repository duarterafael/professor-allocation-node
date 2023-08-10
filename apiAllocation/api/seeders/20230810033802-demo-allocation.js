'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Allocations', [
      {
        week_day:"Terça",
        start_hour:'14:00:00',
        end_hour:'15:00:00',
        professor_id: 1,
        course_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        week_day:"Segunda",
        start_hour:'17:00:00',
        end_hour:'18:00:00',
        professor_id: 2,
        course_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Allocations', null, {});
  }
};
