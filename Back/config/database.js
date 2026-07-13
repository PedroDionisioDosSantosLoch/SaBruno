import  Sequelize  from 'sequelize';

const sequelize = new Sequelize(
  'escoladb',
  'root',
  'senai',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

export default sequelize;
