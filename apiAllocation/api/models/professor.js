'use strict';
module.exports = (sequelize, DataTypes) => {
  const Professor = sequelize.define('Professor', {
    name: DataTypes.STRING,
    cpf: DataTypes.CHAR
  }, {});
  Professor.associate = function(models) {
    Professor.hasMany(models.Allocation, {
      foreignKey: 'professor_id'
    })
    Professor.belongsTo(models.Department, {
      foreignKey:'department_id'
    })
  };
  return Professor;
};