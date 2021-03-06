const Sequelize = require('sequelize');
const db = require('../db');

const Score = db.define('score', {
  score: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  itemsFound: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
});

module.exports = Score;
