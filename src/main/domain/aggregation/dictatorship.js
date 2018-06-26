const average = require('./average')

module.exports.calculateWithSensorData = (ratings, sensorData) => {
    return average.calculate(sensorData)
}