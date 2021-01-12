const router = require('express').Router();
const User = require('../model/User');
const Profile = require('../model/Profile');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerSchema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
})

const loginSchema = Joi.object({
    email: Joi.string().min(1).required(),                      //do zmiany!!!!
    password: Joi.string().min(1).required(),
})

router.post('/register', async (req, res) => {
    const {error} = registerSchema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).send('Email already used');

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })
    try {
        const savedUser = await user.save();
        const profile = new Profile({
            userId: user._id,
            name: user.name,
            email: user.email,
            friends: []
        })
        const savedProfile = await profile.save();
        res.send(savedProfile);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post('/login', async (req,res) =>{
    const {error} = loginSchema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Account does not exist');

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send('Invalid password');

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    //res.header('Bearer', token).send(token);

    const userProfile = await Profile.findOne({userId: user._id})
    res.status(200).send({token,userProfile});
    
})


module.exports = router;