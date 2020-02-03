const router = require('express').Router();
const Clue = require('../db/models/clue')
module.exports = router;


router.get('/', async (req, res, next) => {
	try {
		const clues = await Clue.findAll()
		res.json(clues)
	}
	catch (error) {
		next(error)
	}
})

