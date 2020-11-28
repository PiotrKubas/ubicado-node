const router = require('express').Router();
const verify = require('./verifyToken')
const Profile = require('../model/Profile');

router.get('/', verify, async (req,res)=> {
    const user = req.user
    const userProfile = await Profile.findOne({userId: user._id})
    res.status(200).send(userProfile)
})

module.exports = router;