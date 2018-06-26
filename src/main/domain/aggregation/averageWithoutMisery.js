var average = require('./average')
var grouping = require('../grouping/grouping')

module.exports.calculate = (ratings, miseries) => {
    for(let i = 0; i < ratings.length; i++) {
            if(miseries[ratings[i].day][ratings[i].time].length > 0 && 
                ratings[i].crowdRating < miseries[ratings[i].day][ratings[i].time][0].crowdRating) {

                ratings[i].crowdRating = null
            }
            if(miseries[ratings[i].day][ratings[i].time].length > 0 && 
                ratings[i].noiseRating < miseries[ratings[i].day][ratings[i].time][0].noiseRating) {

                ratings[i].noiseRating = null
            }
            if(miseries[ratings[i].day][ratings[i].time].length > 0 && 
                ratings[i].temperatureRating < miseries[ratings[i].day][ratings[i].time][0].temperatureRating) {

                ratings[i].temperatureRating = null
            }
            if(miseries[ratings[i].day][ratings[i].time].length > 0 && 
                ratings[i].lightRating < miseries[ratings[i].day][ratings[i].time][0].lightRating) {

                ratings[i].lightRating = null
            }
    }
    return average.calculate(ratings)
}

module.exports.calculateWithSensorData = (ratings, sensorData) => {
    var sensorAverage = grouping.groupByDayAndTime(average.calculate(sensorData))
    return calculate(ratings, sensorAverage)
}
