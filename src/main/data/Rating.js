const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    userId: {
        type: String, 
        ref: 'User',
        required: true
    },
    // scheduleId: {
    //     type: String,
    //     ref: 'Schedule',
    //     required: true
    // },
    noiseRating: {
        type: Number,
        default: null
    },
    temperatureRating: {
        type: Number,
        defalt: null
    },
    crowdRating: {
        type: Number,
        default: null
    },
    lightRating: {
        type: Number,
        defalt: null
    }
})

const RatingModel = module.exports = mongoose.model('Rating', schema)