const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    // 8 => 8:00, 20.5 => 20:30
    hourStart: {
        type: Number,
        required: true
    },
    hourEnd: {
        type: Number,
        required: true
    },
    // O - Monday, 1 - Tuesday..., 6 - Sunday
    day: {
        type: Number,
        required: true
    },
    // TODO How to calculate this?
    // Opt1.: Define a new collection of rating
    // and map a rating (mean of other ratings)
    // to a schedule.
    overallRating: {
        type: Number,
        default: 3
    }
})

const ScheduleModel = module.exports = mongoose.model('Schedule', schema)