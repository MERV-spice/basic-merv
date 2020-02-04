const router = require('express').Router();
const {Game, Clue, User, Picture} = require('../db/models');
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
    const game = await Game.findByPk(parseInt(req.params.gameId, 10), {
      include: [{model: Clue, include: [Picture]}, User]
    });
    res.json(game);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newGame = await Game.create({name: req.body.name});
    await Promise.all(
      req.body.clues.map(async clue => {
        const newClue = await Clue.create({text: clue.clueText});
        await newClue.addPicture(await Picture.findByPk(clue.clueImgId));
        return newClue.addGame(newGame);
      })
    );

    const game = await Game.findByPk(newGame.id);
    res.json(game);
  } catch (err) {
    next(err);
  }
});
