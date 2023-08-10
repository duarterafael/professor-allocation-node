'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Allocations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      week_day: {
        type: Sequelize.STRING
      },
      start_hour: {
        type: Sequelize.TIME
      },
      end_hour: {
        type: Sequelize.TIME
      },
      professor_id:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{model: 'Professors', key:'id'}
      },
      course_id:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{model: 'Courses', key:'id'}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Allocations');
  }
};