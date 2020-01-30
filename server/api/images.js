const router = require('express').Router();
const compare = require('../clarifai/compare');
module.exports = router;

const sky = 'https://images.pexels.com/photos/912110/pexels-photo-912110.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'

router.get('/compare', async (req, res, next) => {
    try {
	const ha = await compare(sky);
	res.json(ha)
    } catch (err) {
	next(err)
    }
})
