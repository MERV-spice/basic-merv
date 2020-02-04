const router = require('express').Router();
const compare = require('../clarifai/compare');
const Picture = require('../db/models/picture');
module.exports = router;

const sky =
  'https://images.pexels.com/photos/912110/pexels-photo-912110.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';

//send associated clueid to check against
router.get('/', async (req, res, next) => {
  try {
    const point = {
      type: 'Point',
      coordinates: [
        req.body.position.coords.latitude,
        req.body.position.coords.longitude
      ]
    };
    await Picture.create({accessPic: req.body.url, location: point});
    if (req.body.compare) {
      const comparison = await compare(req.body.url);
      //filter comparison.hits to only get the associated clue id score
      // console.log(comparison.hits);
      res.status(202).json(comparison.hits);
    } else {
      res.sendStatus(202);
    }
  } catch (err) {
    next(err);
  }
});

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
    console.log(picture);
    res.status(202).json(picture);
  } catch (err) {
    next(err);
  }
});
