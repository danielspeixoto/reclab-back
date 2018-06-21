const Schedule = require('../data/Schedule.js')
const User = require('../data/User.js')
const Rating = require('../data/Rating.js')
const Recommendation = require('./recommendation.js')
const aggregation = require('./aggregation.js')

module.exports.getSchedules = function(day, callback) {
    // FFILTER BBY DAY
    Rating.find({}, (err, ratings) => {
        if(err) {
            console.log("[Error]:domain/scheduling:Find Ratings")
            callback(err ,null)  
        } else {
            ratings = aggregation.groupByDay(aggregation.average(ratings))
            schedules = Recommendation.recommend(
                ratings,
                day
            )
            callback(null, schedules) 
        }
    })
}