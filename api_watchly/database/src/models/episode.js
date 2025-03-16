const { Model, DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../../data/watchlyDB',
});

class Episode extends Model {}

Episode.init(
    {
        episode_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(100),
        },
        description: {
            type: DataTypes.STRING(500),
        },
        duration: {
            type: DataTypes.TIME,
        },
        show_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'shows',
                key: 'show_id',
            },
        },
    },
    {
    sequelize,
    modelName: 'Episode',
    tableName: 'episode',
    timestamps: false,
});

module.exports = Episode;

// create a show example
const ep  = Episode.build({
    episode_id: 1,
    name: 'Episode 1',
    description: 'Description',
    duration: '01:00:00',
    show_id: 1,
});
ep.save().then(() => console.log('Episode created'));