const router = require('express').Router();
const Clue = require('../db/models/clue')

router.get('/', async (req, res, next) => {
	try {
		const clues = await Clue.findAll()
		console.log('in clue route', clues)
		res.json(clues)
	}
	catch (error) {
		next(error)
	}
})

