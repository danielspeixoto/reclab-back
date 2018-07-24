const assert = require ('chai').assert

const Sensors = require('../main/data/Sensors')
const Recommendation = require('../main/domain/recommendation.js')
// Import aggregation types
const average = require('../main/domain/aggregation/average')
const averageWithoutMisery = require('../main/domain/aggregation/averageWithoutMisery')
const bordaCount = require('../main/domain/aggregation/bordaCount')
const multiplicative = require('../main/domain/aggregation/multiplicative')

var random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var numOfRatings = 1000
var topAmount = 10
var numOfUsers = 10
var numOfTests = 10

var aggs = [average, multiplicative, averageWithoutMisery, bordaCount]
var sensorData = Sensors.getData()
var globalAmount = 0
for(var test = 0; test < numOfTests; test++) {
    var ratings = []
    for(var rat = 0; rat < numOfRatings; rat++) {
        ratings.push({
            userId: random(1, numOfUsers),
            schedule: random(7, 22),
            day: random(0,4),
            noiseRating: random(1, 5),
            temperatureRating: random(1, 5),
            crowdRating: random(1, 5),
            lightRating: random(1, 5),
        })
    }
    //console.log("Ratings")
    //console.log(ratings)

    var results = []
    var resultsByDay = [results.length]
    var ranks = []
    for(var method = 0; method < aggs.length; method++) {
        results.push(
            aggs[method].calculateWithSensorRating(JSON.parse(JSON.stringify(ratings)), 
            JSON.parse(JSON.stringify(sensorData)))
        )
        resultsByDay[method] = []
        ranks[method] = []
        for(var day = 0; day < 5; day++) {
            resultsByDay[method].push(
                Recommendation.attribution(
                    results[method],
                    day
                )
            )
            let localRank = []
            for(var item = 0; item < topAmount; item++) {
                localRank.push(resultsByDay[method][day][item].time)
            }
            ranks[method].push(localRank)
        }
    }
    let amount = 0
    for(var day = 0; day < 5; day++) {
        for(var item = 0; item < ranks[0].length; item++) {
            let current = ranks[0][day][item]
            for(var method = 1; method < aggs.length; method++) {
                if(!ranks[method][day].includes(current)) {
                    break;
                }
                // all methods have it
                if(method == aggs.length -1) {
                    amount++
                }
            }
        }
    }
    amount = amount/5
    globalAmount += amount
}
console.log("End - Global Amount = ")
console.log(((globalAmount/numOfTests) / topAmount) * 100 + "%")