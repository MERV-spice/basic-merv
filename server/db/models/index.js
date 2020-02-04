const User = require('./user');
// const Team = require('./team')
const Picture = require('./picture');
const CluePicture = require('./cluePicture');
const Clue = require('./clue');
const Game = require('./game');

Game.belongsToMany(Clue, {
  through: 'GameClue'
});
Clue.belongsToMany(Game, {
  through: 'GameClue'
});

User.belongsTo(Game);
Game.hasMany(User);

// User.belongsToMany(Team, {
//   through: 'UserTeam'
// });
// Team.belongsToMany(User, {
// through: 'UserTeam'
// });

Picture.belongsToMany(Clue, {
  through: CluePicture
});
Clue.belongsToMany(Picture, {
  through: CluePicture
});

// Picture.belongsTo(User);
// User.hasMany(Picture);

module.exports = {
  Picture,
  User,
  CluePicture,
  //Team,
  Game,
  Clue
};
