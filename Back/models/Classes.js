const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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

module.exports = Classes