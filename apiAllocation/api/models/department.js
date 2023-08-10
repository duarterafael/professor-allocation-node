'use strict';
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    name: DataTypes.STRING
  }, {});
  Department.associate = function(models) {
    Department.hasMany(models.Professor, {
      foreignKey: 'department_id'
    })
  };
  return Department;
};