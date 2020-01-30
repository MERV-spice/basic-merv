const Sequelize = require('sequelize')
const db = require('../db')

const Location = db.define('location', {
	point: {
		type: Sequelize.GEOMETRY('POINT'),
 }
})


module.exports = Location