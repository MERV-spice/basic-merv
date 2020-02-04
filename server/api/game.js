const router = require('express').Router();
const { Game, Clue, User } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
    try {
	const games = await Game.findAll({
	    include: [Clue, User]
	});
	res.json(games);
    } catch (err) {
	next(err);
    }
});

router.get('/:gameId', async (req, res, next) => {
    try {
	const game = await Game.findByPk(parseInt(req.params.gameId), {
	    include: [Clue]
	});
	res.json(game);
    } catch (err) {
	next(err);
    }
});

router.post('/', async (req, res, next) => {
	console.log('req body', req.body)
	try {
		const newGame = await Game.create({name: req.body.name});
		const newClues = await Clue.bulkCreate(req.body.clues.map(clue => {
			return {text: clue.clueText}
		}))
		// await Promise.all(newClues.map(async (clue, i) => {

		// }))
		res.json(newGame)
	} catch (err) {
		next(err)
	}
})