const { Model, DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../../data/watchlyDB',
});

class Genre extends Model {}

Genre.init(
    {
        genre_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(50),
        },
    },
    {
    sequelize,
    modelName: 'Genre',
    tableName: 'genre',
    timestamps: false,
});

module.exports = Genre;

// create a casting example
const genre  = Genre.build({
    genre_id: 1,
    name: 'Action',
});
genre.save().then(() => console.log('Genre created!'));