var average = require('./average')
var grouping = require('../grouping/grouping')

module.exports.calculate = (ratings, miseries) => {
    for(let i = 0; i < ratings.length; i++) {
        if(miseries[ratings[i].day][ratings[i].schedule - 7].length > 0) {
            if(ratings[i].crowdRating < miseries[ratings[i].day][ratings[i].schedule - 7][0].crowd / 2) {
                ratings[i].crowdRating = null
            }
            if(ratings[i].noiseRating < miseries[ratings[i].day][ratings[i].schedule - 7][0].noise / 2) {
                ratings[i].noiseRating = null
            }
            if(ratings[i].temperatureRating < miseries[ratings[i].day][ratings[i].schedule - 7][0].temperature / 2) {
                ratings[i].temperatureRating = null
            }
            if(ratings[i].lightRating < miseries[ratings[i].day][ratings[i].schedule - 7][0].light / 2) {
                ratings[i].lightRating = null
            }
        }
    }
    return average.calculate(ratings)
}

module.exports.calculateWithSensorData = (ratings, sensorData) => {
    var sensorAverage = grouping.groupByDayAndTime(average.calculate(sensorData))
    return this.calculate(ratings.concat(sensorData), sensorAverage)
}

module.exports.calculateWithSensorRating = (ratings, sensorRating) => {
    sensors = grouping.groupByDayAndTime(sensorRating)

    for(let i = 0; i < ratings.length; i++) {
        if(sensors[ratings[i].day][ratings[i].schedule - 7].length > 0) {
            if(calcRating(ratings[i]) < sensors[ratings[i].day][ratings[i].schedule - 7][0].rating) {
                // Removes element
                ratings.splice(i,1)
            }
        }
    }
    //console.log(ratings)
    return average.calculateWithSensorRating(ratings, sensorRating)
}

var calcRating = (rating) => {
    var total = 0
    if(rating.crowdRating != null) {
        total += rating.crowdRating
    } else {
        total += 3
    }
    if(rating.lightRating != null) {
        total += rating.lightRating
    } else {
        total += 3
    }
    if(rating.temperatureRating != null) {
        total += rating.temperatureRating
    } else {
        total += 3
    }
    if(rating.noiseRating != null) {
        total += rating.noiseRating
    } else {
        total += 3
    }
    return total / 4
}