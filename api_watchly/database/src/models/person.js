const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');
const Favorite = require('./favorite');


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
            type: DataTypes.STRING(255),
        },
        profile_picture: {
            type: DataTypes.STRING(100),
            allowNull: false, 
            defaultValue: 'assets/img/default-person.jpg'
        }
    },
    {
        sequelize,
        modelName: 'Person',
        tableName: 'person',
        timestamps: false,
    }
);

module.exports = Person;
