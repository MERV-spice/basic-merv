const Sequelize = require('sequelize');
const db = require('db');

const Picture = db.define('picture', {
    NumTimesUsed: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    }, 
    Likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    }, 
    Dislikes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    }, 
    AccessPic: {
        type: Sequelize.STRING,
    },
    Location: {
        type: Sequelize.ARRAY( Sequelize.DECIMAL )
    },
})

module.exports = Picture