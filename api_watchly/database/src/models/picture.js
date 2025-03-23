const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../../data/watchlyDB'),
});


class Picture extends Model {}

Picture.init(
    {
        picture_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        link: {
            type: DataTypes.STRING(100),
        },
    },
    {
        sequelize,
        modelName: 'Picture',
        tableName: 'picture',
        timestamps: false,
    }
);

module.exports = Picture;

// create a picture example
const picture = Picture.build({
    picture_id: 1,
    link: 'link',
});
picture.save().then(() => console.log('Picture saved!'));
