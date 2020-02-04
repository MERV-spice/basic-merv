const User = require('./user');
// const Team = require('./team')
const Picture = require('./picture');
const CluePicture = require('./cluePicture');
const Clue = require('./clue');
const Location = require('./location');
const Game = require('./game');
const Score = require('./score');

Game.belongsToMany(Clue, {
  through: 'GameClue',
});
Clue.belongsToMany(Game, {
  through: 'GameClue',
});

User.belongsTo(Game);
Game.hasMany(User);

Score.belongsTo(User);
User.hasMany(Score);

Score.belongsTo(Game);
Game.hasMany(Score);

// User.belongsToMany(Team, {
//   through: 'UserTeam'
// });
// Team.belongsToMany(User, {
// through: 'UserTeam'
// });

Picture.belongsToMany(Clue, {
  through: CluePicture,
});
Clue.belongsToMany(Picture, {
  through: CluePicture,
});

// Picture.belongsTo(User);
// User.hasMany(Picture);

module.exports = {
  Location,
  Picture,
  User,
  CluePicture,
  //Team,
  Game,
  Clue,
  Score,
};
