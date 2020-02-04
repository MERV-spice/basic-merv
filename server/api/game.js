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
    const game = await Game.findByPk(parseInt(req.params.gameId), {
      include: [{model: Clue, include: [Picture]}, User]
    });
    res.json(game);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  console.log('req body', req.body);
  try {
    const newGame = await Game.create({name: req.body.name});
    const newClues = await Clue.bulkCreate(
      req.body.clues.map(clue => {
        return {text: clue.clueText};
      }),
      options.individualHooks === true
    );
    //bulkCreate by default does not run any hooks
    //bC takes second argument, to run the hooks for each model after
    //they have been created. Unless you DO NOT want those hooks add
    //this piece in. (run hooks true, something along those lines)

    //createMany ( :/ )

    // await Promise.all(newClues.map(async (clue, i) => {

    // }))
    res.json(newGame);
  } catch (err) {
    next(err);
  }
});
