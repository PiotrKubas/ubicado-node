const router = require('express').Router();
const verify = require('./verifyToken')
const Meeting = require('../model/Meeting');
const Profile = require('../model/Profile');

router.get('/', verify, async (req,res)=> {
    const user = req.user
    const userMeeting = await Meeting.findOne({creatorId: user._id})
    res.status(200).send(userMeeting)
})

router.post('/', verify, async (req,res)=> {
    const user = req.user
    const userMeeting = await Meeting.findOne({creatorId: user._id})
    if(userMeeting) return res.status(400).send('You already have an active meeting')
    const userProfile = await Profile.findOne({userId: user._id})

    const meeting = new Meeting({
        creatorId: user._id,
        creatorName: userProfile.name,
        title: req.body.title

    })
    await meeting.save()
    res.status(200).send(meeting)
})

router.delete('/', verify, async (req,res)=> {
    const user = req.user
    const userMeeting = await Meeting.findOne({creatorId: user._id})
    if(!userMeeting) return res.status(400).send('You do not have any meetings')
    
    await userMeeting.delete()
    res.status(200).send({title: ''})
})

module.exports = router;