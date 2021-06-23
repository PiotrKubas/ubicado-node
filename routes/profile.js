const router = require('express').Router();
const verify = require('./verifyToken')
const Profile = require('../model/Profile');

router.get('/', verify, async (req, res) => {
    const user = req.user
    const userProfile = await Profile.findOne({ userId: user._id })
    let foundFriend = null
    const friends = await Promise.all(userProfile.friends.map(async friend => {
        foundFriend = await Profile.findOne({ name: friend.name })
        return { name: foundFriend.name, email: foundFriend.email, fullName: foundFriend.fullName, description: foundFriend.description, address: foundFriend.address } 
    }))
    res.status(200).send({...userProfile, friends})
})

router.put('/position', verify, async (req, res) => {
    const user = req.user
    const userProfile = await Profile.findOne({ userId: user._id })
    const date = new Date()
    userProfile.position = { ...req.body, date }
    await userProfile.save();
    res.status(200).send(userProfile.position);
})

router.put('/update', verify, async (req, res) => {
    const user = req.user
    const userProfile = await Profile.findOne({ userId: user._id })
    userProfile.description = req.body.description;
    userProfile.address = req.body.address;
    userProfile.fullName = req.body.fullName;
    await userProfile.save();
    let foundFriend = null
    const friends = await Promise.all(userProfile.friends.map(async friend => {
        foundFriend = await Profile.findOne({ name: friend.name })
        return { name: foundFriend.name, email: foundFriend.email, fullName: foundFriend.fullName, description: foundFriend.description, address: foundFriend.address }     }))
    res.status(200).send({...userProfile, friends});
})

router.put('/friends', verify, async (req, res) => {
    const user = req.user
    const userProfile = await Profile.findOne({ userId: user._id })
    if (userProfile.friends.find((friend) => friend.name === req.body.name)) return res.status(400).send('It is already your friend');
    const friendProfile = await Profile.findOne({ name: req.body.name })
    if (!friendProfile) return res.status(401).send('User not found');
    userProfile.friends.push(
        { name: friendProfile.name}
    );
    await userProfile.save();
    let foundFriend = null
    const friends = await Promise.all(userProfile.friends.map(async friend => {
        foundFriend = await Profile.findOne({ name: friend.name })
        return { name: foundFriend.name, email: foundFriend.email, fullName: foundFriend.fullName, description: foundFriend.description, address: foundFriend.address } 
    }))
    res.status(200).send({...userProfile, friends});
})

router.delete('/friends', verify, async (req, res) => {
    const user = req.user
    const userProfile = await Profile.findOne({ userId: user._id })
    const friendToRemove = userProfile.friends.find(friend => friend.name === req.body.name)
    if (!friendToRemove) return res.status(400).send('User not found');
    userProfile.friends = userProfile.friends.filter(friend => friend.name !== friendToRemove.name)
    await userProfile.save();
    let foundFriend = null
    const friends = await Promise.all(userProfile.friends.map(async friend => {
        foundFriend = await Profile.findOne({ name: friend.name })
        return { name: foundFriend.name, email: foundFriend.email, fullName: foundFriend.fullName, description: foundFriend.description, address: foundFriend.address } 
    }))
    res.status(200).send({...userProfile, friends});
})

router.get('/friends-positions', verify, async (req, res) => {
    const user = req.user
    const userProfile = await Profile.findOne({ userId: user._id })
    let foundFriend = null
    const positions = await Promise.all(userProfile.friends.map(async friend => {
        foundFriend = await Profile.findOne({ name: friend.name })
        return { name: friend.name, position: foundFriend.position }
    }))
    res.status(200).send(positions);

})

module.exports = router;