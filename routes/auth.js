const router = require('express').Router();
const User = require('../model/User');
const Joi = require('@hapi/joi');

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
    
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }
    res.send('Register')
})

router.post('/login')


module.exports = router;