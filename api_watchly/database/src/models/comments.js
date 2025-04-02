const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');
const Person = require('./person');

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
            type: DataTypes.TEXT, // Changed from STRING(500) to TEXT!!
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
