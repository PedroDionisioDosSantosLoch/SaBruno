import {DataTypes} from 'sequelize';
import database from '../config/database.js';


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
    },
    endereco:{
        type: DataTypes.STRING,
        allowNull:false
    }
})


export default Student;