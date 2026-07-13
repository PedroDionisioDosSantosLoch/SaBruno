const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Student = require('./Students.js')

const Grades=database.define('Grades',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    student:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'Student',
            key:'id'
        }
    }
})
Student.hasMany(Grades,{foreignKey:'student', as:'grades'});
Grades.belongsTo(Student,{foreignKey:'student', as:'student'});

module.exports=Grades;