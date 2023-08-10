'use strict';
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    name: DataTypes.STRING
  }, {});
  Course.associate = function(models) {
    Course.hasMany(models.Allocation, {
      foreignKey: 'course_id'
    })
  };
  return Course;
};