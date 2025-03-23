const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

const path = require('path');

class Casting extends Model {}

 Casting.init (
    {
    cast_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(50),
    },
    surname: {
        type: DataTypes.STRING(50),
    },
    is_actor: {
        type: DataTypes.BOOLEAN,
    },
}, 
{
    sequelize,
    modelName: 'Casting',
    tableName: 'casting',
    timestamps: false,
});

module.exports = Casting;

// create a casting example
const casting = Casting.build({
    cast_id: 1,
    name: 'name',
    surname: 'surname',
    is_actor: true,
});
casting.save().then(() => console.log('Casting saved!'));