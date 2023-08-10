'use strict';
module.exports = (sequelize, DataTypes) => {
  const Allocation = sequelize.define('Allocation', {
    week_day: DataTypes.STRING,
    start_hour: DataTypes.TIME,
    end_hour: DataTypes.TIME
  }, {});
  Allocation.associate = function(models) {
    Allocation.belongsTo(models.Course, {
      foreignKey: 'course_id'
    })
    Allocation.belongsTo(models.Professor, {
      foreignKey: 'professor_id'
    })
  };
  return Allocation;
};