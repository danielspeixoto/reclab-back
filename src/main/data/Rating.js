const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    _id: {
        type: String
    },
    userId: {
        type: String, 
        ref: 'User'
    },
    scheduleId: {
        type: String,
        ref: 'Schedule'
    },
    noiseRating: {
        type: Number,
        default: null
    },
    temperatureRating: {
        type: Number,
        defalt: null
    }
})

const RatingModel = module.exports = mongoose.model('Rating', schema)