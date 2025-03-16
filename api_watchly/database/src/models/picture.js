const { Model, DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../../data/watchlyDB',
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
            allowNull: true,
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
