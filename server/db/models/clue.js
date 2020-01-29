const Sequelize = require('sequelize')
const db = require('../db')

const Clue = db.define('clue', {
	time: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	lat: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	text: {
		type: Sequelize.STRING,
	},
	//image needs to be set up through a relationship
	hint: {
		type: Sequelize.TEXT
	}
	
})
