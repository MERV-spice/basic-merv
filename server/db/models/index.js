const User = require('./user')
// const Team = require('./team')
const Picture = require('./picture')
// const CluePicture = require('./cluePicture')
const Clue = require('./clue')
const Location = require('./location')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

// User.belongsToMany(Team, {
//   through: 'UserTeam'
// });
// Team.belongsToMany(User, {
// through: 'UserTeam'
// });

// Picture.belongsTo(Clue);
// Clue.hasMany(Picture);
// Picture.belongsTo(User);
// User.hasMany(Picture);

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
	Location, 
	Picture,
//   User,
//  Team,
//   Clue
}
