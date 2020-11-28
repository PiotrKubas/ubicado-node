const router = require('express').Router();
const User = require('../model/User');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');

const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
})

router.post('/register', async (req, res) => {
    const {error} = schema.validate(req.body);
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
        res.send({userId: user._id});
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post('/login')


module.exports = router;