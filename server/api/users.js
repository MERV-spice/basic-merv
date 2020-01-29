const router = require('express').Router()
const sequelize = require('sequelize')
const Location = require ('../db/models/location')
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

router.post('/test', async (req,res,next) => {
	try {
		const point = { type: 'Point', coordinates: [req.body.coords.latitude, req.body.coords.longitude] };
	const location =	await Location.create({
			point
			})
	console.log(location);
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
