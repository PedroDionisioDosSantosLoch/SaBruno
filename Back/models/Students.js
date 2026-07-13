const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Student=database.define('Student',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    sala:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
})

module.exports=Student;