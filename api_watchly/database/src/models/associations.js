const Picture = require('./picture');
const Illustrated = require('./illustrated');
const Episode = require('./episode');
const Show = require('./shows'); // utile si tu veux aussi gérer show → illustrated
const Genre = require('./genre');
const Comments = require('./comments');
const Person = require('./person');
const Favorite = require('./favorite');
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

Comments.belongsTo(Show, { foreignKey: 'show_id' });
Show.hasMany(Comments, { foreignKey: 'show_id' });

Show.hasMany(Favorite, { foreignKey: 'show_id' });
Favorite.belongsTo(Show, { foreignKey: 'show_id' });

Person.hasMany(Favorite, { foreignKey: 'person_id' });
Favorite.belongsTo(Person, { foreignKey: 'person_id' });

module.exports = {
  Picture,
  Illustrated,
  Episode,
  Show,
  Genre,
  Comments,
  Person,
};
