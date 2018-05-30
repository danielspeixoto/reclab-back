const Schedule = require('../data/Schedule.js')
const User = require('../data/User.js')
const Rating = require('../data/Rating.js')
const Recommendation = require('./recommendation.js')

module.exports.getSchedules = function(userId, callback) {
    Schedule.find({}, (err ,schedules) => {
        if(err) {
            console.log("[Error]:domain/scheduling:Find Schedules")
            callback(err ,null)  
        } else {
            Rating.find({
                userId
            }, (err ,ratings) => {
                if(err) {
                    console.log("[Error]:domain/scheduling:Find Ratings by user")
                    callback(err ,schedules)
                } else {
                    schedules = Recommendation.recommend(
                        ratings,
                        schedules
                    )
                    callback(null, schedules)
                }
            })
        }
    })
}