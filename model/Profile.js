const { number } = require('@hapi/joi')
const mongoose = require('mongoose')  

const profileSchema = new mongoose.Schema({
    userId : {
        type: String,
        required: true,
    },

    name : {
        type: String,
        required: true,
        min: 6,
        max: 255 
    },
    
    email : {
        type: String,
        required: true,
        min: 6,
        max: 255 
    },
    friends : {
        type: Array,
        required: true,
    },
    position : {
        type: Object,
        required: false
    }
     
})


module.exports = mongoose.model('Profile', profileSchema)