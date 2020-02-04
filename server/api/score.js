const router = require('express').Router();
const { Score, User } = require('../db/models');
module.exports = router;

router.get('/:gameId', async (req, res, next) => {
  console.log('IN ROUTE', req.params);
  try {
    const scores = await Score.findAll({
      include: [{ model: User }],
      where: {
        gameId: req.params.gameId,
      },
      order: [['score', 'DESC']],
      limit: 5,
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
