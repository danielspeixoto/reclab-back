average = require('./average')

module.exports.calculate = (ratings, miseries) => {
    for(let i = 0; i < ratings.length; i++) {
            if(ratings[i].crowdRating < miseries.crowdRating) {
                ratings[i].crowdRating = null
            }
            if(ratings[i].noiseRating < miseries.noiseRating) {
                ratings[i].noiseRating = null
            }
            if(ratings[i].temperatureRating < miseries.temperatureRating) {
                ratings[i].temperatureRating = null
            }
            if(ratings[i].lightRating < miseries.lightRating) {
                ratings[i].lightRating = null
            }
    }
    return average.calculate(ratings)
}

module.exports.calculateWithSensorData = (ratings, sensorData) => {
    return calculate(ratings, {
        crowdRating: 0,
        noiseRating: 0,
        temperatureRating: 0,
        lightRating: 0,
    })
}
