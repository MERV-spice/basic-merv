const Sequelize = require('sequelize');
const db = require('../db');

const Picture = db.define('picture', {
    numTimesUsed: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    }, 
    likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    }, 
    dislikes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    }, 
    accessPic: {
        type: Sequelize.STRING,
    },
    location: {
        type: Sequelize.GEOMETRY('POINT'),
    },
})

module.exports = Picture