const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    scheduleStart: {
        type: Number,
        required: true
    },
    scheduleEnd: {
        type: Number,
        required: true
    },
    overallRating: {
        type: Number,
        default: 3
    }
})

const ScheduleModel = module.exports = mongoose.model('Schedule', schema)