const router = require('express').Router();
const verify = require('./verifyToken')

router.get('/', verify, (req,res)=> {
    res.send({id: req.user._id})
})

module.exports = router;