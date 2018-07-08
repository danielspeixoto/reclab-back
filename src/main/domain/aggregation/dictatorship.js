const average = require('./average')

module.exports.calculateWithSensorData = (ratings, sensorData) => {
    return average.calculate(sensorData)
}

module.exports.calculateWithSensorRating = (ratings, sensorRating) => {
    return sensorRating
}