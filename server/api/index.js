const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/images', require('./images'));
<<<<<<< HEAD
router.use('/auth', require('../auth'));
=======
router.use('/games', require('./game'));
>>>>>>> e9dae8d034fee314ed7b0055ffeb4f02449e6c2b

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
