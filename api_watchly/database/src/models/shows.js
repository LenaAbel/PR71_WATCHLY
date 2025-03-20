const { Model, DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../../data/watchlyDB'),
});

class Shows extends Model {}

Shows.init(
    {
        show_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(50),
        },
        description: {
            type: DataTypes.STRING(500),
        },
        released_date: {
            type: DataTypes.DATE,
        },
        nationality: {
            type: DataTypes.STRING(50),
        },
        trailer_link: {
            type: DataTypes.STRING(200),
        },
        status: {
            type: DataTypes.STRING(50),
        },
        duration: {
            type: DataTypes.TIME,
        },
        is_movie: {
            type: DataTypes.BOOLEAN,
        },
        is_displayed: {
            type: DataTypes.BOOLEAN,
        },
        rating: {
            type: DataTypes.TINYINT,
            validate: {
                min: 0,
                max: 10,
            },
        },
    },
    {
    sequelize,
    modelName: 'Shows',
    tableName: 'shows',
    timestamps: false,
});

module.exports = Shows;

