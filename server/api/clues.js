const router = require('express').Router();
const { Clue } = require('../db/models');
module.exports = router;

router.post('/', async (req, res, next) => {
    try {
        const reqClue = req.body;
        const newClue = await Clue.create(reqClue); 
        res.json(newClue); 
    } catch (err) {
        next(err); 
    }
}); 
