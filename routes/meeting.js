const router = require('express').Router();
const verify = require('./verifyToken')
const Meeting = require('../model/Meeting');
const Profile = require('../model/Profile');

router.get('/', verify, async (req, res) => {
    const user = req.user
    const userMeeting = await Meeting.findOne({ creatorId: user._id })
    res.status(200).send(userMeeting)
})

router.post('/', verify, async (req, res) => {
    const user = req.user
    const userMeeting = await Meeting.findOne({ creatorId: user._id })
    if (userMeeting) return res.status(401).send('You already have an active meeting')
    const userProfile = await Profile.findOne({ userId: user._id })

    const meeting = new Meeting({
        creatorId: user._id,
        creatorName: userProfile.name,
        date: req.body.date,
        title: req.body.title,
        description: req.body.description,
        address: req.body.address,
        position: req.body.position,
        reactions: [{ name: userProfile.name, isComing: true }]
    })
    await meeting.save()
    res.status(200).send(meeting)
})

router.delete('/', verify, async (req, res) => {
    const user = req.user
    const userMeeting = await Meeting.findOne({ creatorId: user._id })
    if (!userMeeting) return res.status(400).send('You do not have any meetings')

    await userMeeting.delete()
    res.status(200).send({ title: '' })
})
router.get('/friends-meetings', verify, async (req, res) => {
    const user = req.user
    const userProfile = await Profile.findOne({ userId: user._id })
    if (!userProfile) return res.status(400).send('User not found')
    const meetings = await Promise.all(userProfile.friends.map(async (friend) => {
        return await Meeting.findOne({ creatorName: friend.name })
    }));
    const meetingsToSend = meetings.filter(meeting => meeting !== null)
    res.status(200).send(meetingsToSend)
})

router.put('/update', verify, async (req, res) => {
    const user = req.user
    const userMeeting = await Meeting.findOne({ creatorId: user._id })
    if (!userMeeting) return res.status(400).send('Meeting not found')
    userMeeting.description = req.body.description;
    userMeeting.address = req.body.address;
    userMeeting.date = req.body.date;
    await userMeeting.save();
    res.status(200).send(userMeeting);
})
router.put('/reactions', verify, async (req, res) => {
    const user = req.user
    const friendMeeting = await Meeting.findOne({ creatorName: req.body.creator })
    if (!friendMeeting) return res.status(400).send('Meeting not found')
    friendMeeting.reactions = friendMeeting.reactions.filter(reaction => reaction.name !== req.body.name);
    friendMeeting.reactions.push({ name: req.body.name, isComing: req.body.isComing })
    await friendMeeting.save();
    res.status(200).send(friendMeeting);
})

module.exports = router;