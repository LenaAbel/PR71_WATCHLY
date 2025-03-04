const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    person_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    mail: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    picture_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'pictures',
            key: 'picture_id'
        }
    }
}, {
    tableName: 'person',
    timestamps: false
});

module.exports = User;