const router = require('express').Router();
const verify = require('./verifyToken')
const Profile = require('../model/Profile');

router.get('/', verify, async (req,res)=> {
    const user = req.user
    const userProfile = await Profile.findOne({userId: user._id})
    res.status(200).send(userProfile)
})

router.put('/friends', verify, async (req,res)=> {
    const user = req.user
    const userProfile = await Profile.findOne({userId: user._id})
    if(userProfile.friends.findOne((friend) => friend === req.body.name)) return res.status(400).send('It is already your friend');
    const friendProfile = await Profile.findOne({name: req.body.name})
    if(!friendProfile) return res.status(400).send('User not found');
    userProfile.friends.push(friendProfile.name);
    await userProfile.save();
    res.status(200).send(userProfile);
})

router.delete('/friends', verify, async (req,res)=> {
    const user = req.user
    const userProfile = await Profile.findOne({userId: user._id})
    const friendToRemove = userProfile.friends.find(friend => friend === req.body.name)
    if(!friendToRemove) return res.status(400).send('User not found');
    userProfile.friends = userProfile.friends.filter(friend => friend !== friendToRemove)
    await userProfile.save();
    res.status(200).send(userProfile);
})

module.exports = router;