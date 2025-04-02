const Picture = require('./picture');
const Illustrated = require('./illustrated');
const Episode = require('./episode');
const Show = require('./shows'); // utile si tu veux aussi gérer show → illustrated
const Genre = require('./genre');
const Comments = require('./comments');
const Person = require('./person');

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

Show.belongsToMany(Genre, { through: 'Has', foreignKey: 'show_id' });
Genre.belongsToMany(Show, { through: 'Has', foreignKey: 'genre_id' });

Comments.belongsTo(Person, { foreignKey: 'person_id', as: 'person' });
Person.hasMany(Comments, { foreignKey: 'person_id', as: 'comments' });

module.exports = {
  Picture,
  Illustrated,
  Episode,
  Show,
  Genre,
  Comments,
  Person,
};
