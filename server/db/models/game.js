const Sequelize = require('sequelize');
const db = require('../db');

const Game = db.define('game', {
  time: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
  },
  makerId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  passcode: {
    type: Sequelize.STRING,
    notNull: true,
    notEmpty: true,
  },
});

module.exports = Game;
