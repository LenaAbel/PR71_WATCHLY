const { Model, DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../../data/watchlyDB',
});

class Shows extends Model {}

Shows.init(
    {
        show_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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

// create a show example
const shows  = Shows.build({
    show_id: 1,
    name: 'Breaking Bad',
    description: 'A high school chemistry teacher turned meth maker',
    released_date: '2008-01-20',
    nationality: 'American',
    trailer_link: 'https://www.youtube.com/watch?v=HhesaQXLuRY',
    status: 'Finished',
    duration: '00:45:00',
    is_movie: false,
    rating: 9,
    picture_id: 1,

});
shows.save().then(() => console.log
('Show created'));