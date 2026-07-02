import {DataTypes} from 'sequelize';
import Student from './Students.js';

const Grades=database.define('Grades',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    student:{
        type: Datatypes.INTEGER,
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