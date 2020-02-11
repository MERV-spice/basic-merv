const router = require('express').Router();
const {Score, User, Game} = require('../db/models');
module.exports = router;

router.get('/game/:gameId', async (req, res, next) => {
  try {
    const scores = await Score.findAll({
      include: [{model: User}, {model: Game}],
      where: {
        gameId: req.params.gameId
      },
      order: [['score', 'DESC']]
    });
    res.json(scores);
  } catch (err) {
    next(err);
  }
});

router.get('/user/:userId', async (req, res, next) => {
  try {
    const userScores = await Score.findAll({
      where: {
        userId: req.params.userId
      }
    });
    res.json(userScores);
  } catch (err) {
    next(err);
  }
});

router.get('/gameUser/:userId/:gameId', async (req, res, next) => {
  try {
    const userGameScores = await Score.findAll({
      where: {
        userId: req.params.userId,
        gameId: req.params.gameId
      }
    });
    res.json(userGameScores);
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const selectedRow = await Score.findOrCreate({
      where: {
        userId: req.body.userId,
        gameId: req.body.gameId
      },
      defaults: {
        score: 0,
        itemsFound: 0
      }
    });
    const userGameScore = await Score.increment(
      {score: req.body.score, itemsFound: 1},
      {
        where: {
          userId: req.body.userId,
          gameId: req.body.gameId
        }
      }
    );
    res.json(userGameScore[0][0][0]);
  } catch (err) {
    next(err);
  }
});
