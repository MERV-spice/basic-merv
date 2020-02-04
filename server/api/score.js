const router = require('express').Router();
const { Score } = require('../db/models');
module.exports = router;

router.get('/:gameId', async (req, res, next) => {
  console.log('IN ROUTE', req.params);
  try {
    const scores = await Score.findAll({
      where: {
        gameId: req.params.gameId,
      },
    });
    console.log(
      'RES.JSON',
      scores.map(score => score.dataValues)
    );
    res.json(scores);
  } catch (err) {
    next(err);
  }
});
