const Sequelize = require('sequelize');
const db = require('../db');

const Clue = db.define('clue', {
  time: {
    type: Sequelize.STRING,
    allowNull: true
  },
  text: {
    type: Sequelize.STRING
  },
  //image needs to be set up through a relationship
  hint: {
    type: Sequelize.TEXT
  }
});

module.exports = Clue;
