const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../../data/watchlyDB'),
});


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

// create a person example
const person = Person.build({
    person_id: 1,
    username: 'username',
    name: 'name',
    surname: 'surname',
    is_admin: true,
    mail: 'mail',
    password: 'password',
});
person.save().then(() => console.log('Person created'));