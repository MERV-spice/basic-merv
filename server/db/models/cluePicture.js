const Sequelize = require('sequelize')
const db = require('../db')

const CluePicture = db.define('cluePicture', {
	numTimesUsed: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
		validate: {
			min: 0,
		}
	},
	likes: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull : false
	},
	dislikes: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull : false,
	}
})