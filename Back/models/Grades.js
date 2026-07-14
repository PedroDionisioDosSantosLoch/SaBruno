import { DataTypes } from 'sequelize';
import Student from './Students.js';
import database from '../config/database.js';


const Grades = database.define('Grades', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Student,
            key: 'id'
        }
    }
});

Student.hasMany(Grades, {
    foreignKey: 'studentId',
    as: 'Grades'
});

Grades.belongsTo(Student, {
    foreignKey: 'studentId',
    as: 'Student'
});

export default Grades;