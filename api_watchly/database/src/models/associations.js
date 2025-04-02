const Picture = require('./picture');
const Illustrated = require('./illustrated');
const Episode = require('./episode');
const Show = require('./shows'); // utile si tu veux aussi gérer show → illustrated

// === Associations ===

// Picture - Illustrated
Picture.hasMany(Illustrated, { foreignKey: 'picture_id' });
Illustrated.belongsTo(Picture, { foreignKey: 'picture_id' });

// Episode - Illustrated
Episode.hasMany(Illustrated, { foreignKey: 'episode_id' });
Illustrated.belongsTo(Episode, { foreignKey: 'episode_id' });

// Show - Illustrated (
Show.hasMany(Illustrated, { foreignKey: 'show_id' });
Illustrated.belongsTo(Show, { foreignKey: 'show_id' });

module.exports = {
  Picture,
  Illustrated,
  Episode,
  Show
};
