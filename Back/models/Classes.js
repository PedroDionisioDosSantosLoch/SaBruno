import  {DataTypes}  from 'sequelize'
import sequelize from '../config/database.js'

const Classes = sequelize.define('Classes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    }
});

export default Classes