const router = require('express').Router();
const {Game, Clue, User, Picture} = require('../db/models');
const {input} = require('../clarifai/compare');
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
    console.log(res);
    res.json(game);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newGame = await Game.create({
      name: req.body.name,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      passcode: req.body.passcode
    });
    await Promise.all(
      req.body.clues.map(async clue => {
        const newClue = await Clue.create({
          text: clue.clueText,
          hint: clue.clueHint
        });
        const picture = await Picture.findByPk(clue.clueImgId);
        await input(picture.accessPic, picture.id.toString());
        await newClue.addPicture(picture);
        return newClue.addGame(newGame);
      })
    );

    const game = await Game.findByPk(newGame.id, {
      include: [User, {model: Clue, include: [Picture]}]
    });
    res.json(game);
  } catch (err) {
    next(err);
  }
});
