const router = require('express').Router();
const sequelize = require('sequelize');
const {User, Game, Clue, Picture} = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  const userObj = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };
  try {
    const user = await User.create(userObj);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.post('/location', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.body.userId);
    await user.update({location: location});
    res.status(201).send('changed your location');
  } catch (err) {
    next(err);
  }
});

router.put('/joingame', async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await User.findByPk(req.body.userId);
    //get session id instead of user id from the req.body so that nobody
    //can craft an id to mimic that user
    const game = await Game.findByPk(req.body.gameId, {
      include: [
        {
          model: Clue,
          include: [Picture]
        },
        User
      ]
    });
    await game.addUser(user);
    await user.update({
      currentClue: 0
    });
    res.status(201).json(game);
  } catch (err) {
    next(err);
  }
});
