const { Model, DataTypes } = require('sequelize');
const path = require('path');
const sequelize = require('../../database/src/database');


class Person extends Model {}

Person.init(
    {
        person_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(50),
        },
        name: {
            type: DataTypes.STRING(50),
        },
        surname: {
            type: DataTypes.STRING(50),
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
        },
        mail: {
            type: DataTypes.STRING(100),
        },
        password: {
            type: DataTypes.STRING(50),
        },
    },
    {
        sequelize,
        modelName: 'Person',
        tableName: 'person',
        timestamps: false,
    }
);

module.exports = Person;
