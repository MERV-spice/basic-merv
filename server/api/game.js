const router = require('express').Router();
const { Game, Clue } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
    try {
	const games = await Game.findAll({
	    include: [Clue]
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

