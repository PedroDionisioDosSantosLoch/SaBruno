import  DataTypes  from 'sequelize';
import database from '../config/database.js';
import Student from './Students.js';
import Class from './Classes.js';


const Enrollment = database.define('Enrollment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    studentId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Student,
            key: 'id'
        }
    },
    classId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Class,
            key: 'id'
        }
    }
});

Student.hasMany(Enrollment, {
    foreignKey: 'studentId',
    as: 'Enrollments'
});

Enrollment.belongsTo(Student, {
    foreignKey: 'studentId',
    as: 'Student'
});

Class.hasMany(Enrollment, {
    foreignKey: 'classId',
    as: 'Enrollments'
});

Enrollment.belongsTo(Class, {
    foreignKey: 'classId',
    as: 'Class'
});

export default Enrollment;