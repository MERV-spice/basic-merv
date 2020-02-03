const User = require('./user');
// const Team = require('./team')
const Picture = require('./picture');
// const CluePicture = require('./cluePicture')
const Clue = require('./clue');
const Location = require('./location');
const Game = require('./game');

Game.belongsToMany(Clue, {
    through: 'GameClue'
})
Clue.belongsToMany(Game, {
    through: 'GameClue'
})

// User.belongsToMany(Team, {
//   through: 'UserTeam'
// });
// Team.belongsToMany(User, {
// through: 'UserTeam'
// });

//Picture.belongsTo(Clue);
//Clue.hasMany(Picture);

// Picture.belongsTo(User);
// User.hasMany(Picture);

module.exports = {
  Location, 
  Picture,
  User,
    //  Team,
    Game,
  Clue,
}
