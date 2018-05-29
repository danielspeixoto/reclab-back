const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    _id: {
        type: String
    },
    scheduleStart: {
        type: Number
    },
    scheduleEnd: {
        type: Number
    },
    overallRating: {
        type: Number
    }
})

const ScheduleModel = module.exports = mongoose.model('Schedule', schema)