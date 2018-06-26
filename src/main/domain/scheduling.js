const Schedule = require('../data/Schedule.js')
const User = require('../data/User.js')
const Rating = require('../data/Rating.js')
const Recommendation = require('./recommendation.js')
const aggregation = require('./aggregation/average')


module.exports.getSchedules = function(day, callback) {
    // FILTER BY DAY
    Rating.find({}, (err, ratings) => {
        if(err) {
            console.log("[Error]:domain/scheduling:Find Ratings")
            callback(err ,null)  
        } else {
            ratings = aggregation.calculate(ratings)
            schedules = Recommendation.attribution(
                ratings,
                day
            )
            callback(null, schedules) 
        }
    })
}