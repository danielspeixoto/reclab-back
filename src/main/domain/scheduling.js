const Schedule = require('../data/Schedule.js')
const User = require('../data/User.js')
const Rating = require('../data/Rating.js')
const Recommendation = require('./recommendation.js')

module.exports.getSchedules = function(userId, callback) {
    Schedule.find({}, (schedules, err) => {
        if(err) {
            callback(null, err)  
        } else {
            User.findById(userId, (user, err) => {
                if(err) {
                    callback(schedules, err)
                } else {
                    Rating.find({
                        userId
                    }, (ratings, err) => {
                        if(err) {
                            callback(schedules, err)
                        } else {
                            schedules = Recommendation.recommend(user,
                                 ratings, schedules)
                            callback(schedules, null)
                        }
                    })
                }
            })
        }
    })
}