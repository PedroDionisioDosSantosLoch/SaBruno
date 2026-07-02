const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'database',
  'root',
  'senai',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

module.exports = sequelize;
