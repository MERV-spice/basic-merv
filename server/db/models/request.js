const Sequelize = require('sequelize');
const db = require('../db');

const Request = db.define('request', {
  type: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['friendRequest', 'gameInvite']]
    }
  },
  fromUser: {
    type: Sequelize.INTEGER
  }
});

module.exports = Request;
