const router = require('express').Router();
const Sequelize = require('sequelize');
const {User, Game, Clue, Picture, Request} = require('../db/models');
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

router.get('/requests', async (req, res, next) => {
  try {
    const sent = await Request.findAll({
      where: {
        fromUser: req.session.passport.user
      }
    });

    let received = await Request.findAll({
      where: {
        userId: req.session.passport.user
      }
    });

    received = await Promise.all(
      received.map(async rec => {
        const user = await User.findByPk(rec.fromUser);
        rec.dataValues.user = user;
        return rec;
      })
    );
    res.json({sent, received});
  } catch (err) {
    next(err);
  }
});

router.get('/:username', async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: {
        username: {
          [Sequelize.Op.like]: `%${req.params.username}%`
        }
      },
      attributes: ['id', 'username']
    });

    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post('/addFriend', async (req, res, next) => {
  try {
    await Request.destroy({
      where: {
        id: req.body.reqId
      }
    });

    const user = await User.findByPk(req.body.userId, {
      attributes: ['id', 'username']
    });
    const other = await User.findByPk(req.session.passport.user);
    await user.addFriend(other);
    await other.addFriend(user);

    res.status(202).json(user);
  } catch (err) {
    next(err);
  }
});

router.post('/request', async (req, res, next) => {
  try {
    const request = await Request.create({
      type: req.body.type,
      fromUser: req.session.passport.user
    });

    const friend = await User.findByPk(req.body.userId);
    await friend.addRequest(request);

    request.userId = req.body.userId;
    res.status(202).json(request);
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
    res.json(user);
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

//route to increase current clue by 1;
router.post('/clue', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.body.id);
    await user.increment('currentClue');
    res.sendStatus(202);
  } catch (err) {
    next(err);
  }
});

//route to reset current clue to zero, should be called when a user switches games
router.post('/reset', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.body.id);
    await user.update({currentClue: 0});
    res.sendStatus(202);
  } catch (err) {
    next(err);
  }
});

router.put('/joingame', async (req, res, next) => {
  try {
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
