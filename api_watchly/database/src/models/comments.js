const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../../data/watchlyDB'),
});

class Comments extends Model {}

Comments.init (
    {
        comment_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        show_id: {
            type: DataTypes.INTEGER,
        },
        episode_id: {
            type: DataTypes.INTEGER,
        },
        person_id: {
            type: DataTypes.INTEGER,
        },
        comment_text: {
            type: DataTypes.STRING(500),
        },
        comment_date: {
            type: DataTypes.DATE,
        },
        is_watched: {
            type: DataTypes.BOOLEAN,
        },
        is_spoiler: {
            type: DataTypes.BOOLEAN,
        },
}, 
{
    sequelize,
    modelName: 'Comments',
    tableName: 'comments',
    timestamps: false,
});

module.exports = Comments;

// create a comm example
const comm = Comments.build({
    comment_id: 1,
    show_id: 1,
    episode_id: 1,
    person_id: 1,
    comment_text: 'comment',
    comment_date: '2021-01-01',
    is_watched: true,
    is_spoiler: false,
});
comm.save().then(() => console.log('Comment saved!'));