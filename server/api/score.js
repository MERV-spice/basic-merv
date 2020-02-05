const router = require('express').Router();
const {Score, User, Game} = require('../db/models');
module.exports = router;

router.get('/:gameId', async (req, res, next) => {
  try {
    const scores = await Score.findAll({
      include: [{model: User}, {model: Game}],
      where: {
        gameId: req.params.gameId
      },
      order: [['score', 'DESC']]
      // limit: 5
    });
    console.log(scores);
    res.json(scores);
  } catch (err) {
    next(err);
  }
});
