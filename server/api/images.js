const router = require('express').Router();
const compare = require('../clarifai/compare');
const Picture = require('../db/models/picture');
module.exports = router;

const sky =
  'https://images.pexels.com/photos/912110/pexels-photo-912110.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';

router.put('/', async (req, res, next) => {
  try {
    const comparison = await compare(req.body.img);
    console.log(req);
    for (let i = 0; i < comparison.hits.length; i++) {
      if (comparison.hits[i].id === req.body.id) {
        res.json(comparison.hits[i]);
        break;
      }
    }
  } catch (err) {
    next(err);
  }
});

//send associated clueid to check against
router.post('/', async (req, res, next) => {
  try {
    const point = {
      type: 'Point',
      coordinates: [
        req.body.position.coords.latitude,
        req.body.position.coords.longitude
      ]
    };
    const picture = await Picture.create({
      accessPic: req.body.url,
      location: point
    });
    res.status(202).json(picture);
  } catch (err) {
    next(err);
  }
});
