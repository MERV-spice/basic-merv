const router = require('express').Router();
const {Clue, Picture} = require('../db/models');
module.exports = router;

router.get('/:clueId', async (req, res, next) => {
  try {
    let clue = await Clue.findByPk(req.params.clueId, {
      include: [Picture]
    });
    res.json(clue);
  } catch (err) {
    next(err);
  }
});
