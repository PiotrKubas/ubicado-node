const mongoose = require('mongoose')  

const meetingSchema = new mongoose.Schema({
    creatorId : {
        type: String,
        required: true,
    },

    creatorName : {
        type: String,
        required: true,
    },

    title : {
        type: String,
        required: true,
        min: 6,
        max: 255 
    }
     
})


module.exports = mongoose.model('Meeting', meetingSchema)