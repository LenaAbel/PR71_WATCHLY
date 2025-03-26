const Picture = require('./picture');
const Illustrated = require('./illustrated');

// Associations
Picture.hasMany(Illustrated, { foreignKey: 'picture_id' });
Illustrated.belongsTo(Picture, { foreignKey: 'picture_id' });

module.exports = {
    Picture,
    Illustrated
};
