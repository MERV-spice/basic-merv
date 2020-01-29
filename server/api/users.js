const router = require('express').Router()
//const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/test', async (req,res,next) => {
    try {
	console.log(true);
	res.end('nice!');
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
