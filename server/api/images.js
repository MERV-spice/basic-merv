const router = require('express').Router();
const compare = require('../clarifai/compare');
const Picture = require('../db/models/picture');
module.exports = router;

const sky =
  'https://images.pexels.com/photos/912110/pexels-photo-912110.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';

router.get('/compare', async (req, res, next) => {
  try {
    const ha = await compare(sky);
    res.json(ha);
  } catch (err) {
    next(err);
  }
});


//send associated clueid to check against
router.post('/', async (req, res, next) => {
    try {
	    const point = { type: 'Point', coordinates: [req.body.position.coords.latitude, req.body.position.coords.longitude] };
      await Picture.create({accessPic: req.body.url, location: point});
	    const comparison = await compare(req.body.url)
	    //filter comparison.hits to only get the associated clue id score
	    console.log(comparison.hits);
      res.status(202).json(comparison.hits); 
    } catch (err) {
       next(err)
    }
})

