const { number } = require('@hapi/joi')
const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },

    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    fullName: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    friends: {
        type: Array,
        required: true,
    },
    history: {
        type: Array,
        required: false,
    },
    position: {
        type: Object,
        required: false
    }

})


module.exports = mongoose.model('Profile', profileSchema)