const router = require('express').Router();
const {Clue, Picture} = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    let clues = await Clue.findAll({
      include: [Picture]
    });
    res.json(clues);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const reqClue = req.body;
    const newClue = await Clue.create(reqClue);
    res.json(newClue);
  } catch (err) {
    next(err);
  }
});
