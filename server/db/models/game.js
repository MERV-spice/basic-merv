const Sequelize = require('sequelize');
const db = require('../db');

const Game = db.define('game', {
  startTime: {
    type: Sequelize.DATE,
    allowNull: true
  },
  endTime: {
    type: Sequelize.DATE,
    allowNull: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true
  },
  makerId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  passcode: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

module.exports = Game;
