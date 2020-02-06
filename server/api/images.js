const router = require('express').Router();
const Picture = require('../db/models/picture');
module.exports = router;

router.post('/', async (req, res, next) => {
  try {
    // const point = {
    //   type: 'Point',
    //   coordinates: [
    //     req.body.position.coords.latitude,
    //     req.body.position.coords.longitude
    //   ]
    // };
    const picture = await Picture.create({
      accessPic: req.body.url
      // location: point
    });
    // console.log(picture);
    res.status(202).json(picture);
  } catch (err) {
    next(err);
  }
});
