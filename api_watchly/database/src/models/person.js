const { Model, DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../../data/watchlyDB',
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
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        surname: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        mail: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: true,
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