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

//var numOfRatings = 10
//var topAmount = 1
var numOfUsers = 100
var numOfTests = 1000

var runTest = (topAmount, numOfRatings) => {
    var aggs = [average, multiplicative, averageWithoutMisery, bordaCount]
    var sensorData = Sensors.getData()
    var globalAmount = 0
    var globalXamt = 0
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
            for(var item = 0; item < ranks[0][day].length; item++) {
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

        var xamt = 0
        for(var day = 0; day < 5; day++) {
            let st = new Set()
            for(let mt = 0; mt < aggs.length; mt++) {
                for(var item = 0; item < ranks[mt][day].length; item++) {
                    st.add(ranks[mt][day][item])
                }
            }
            let amt = 0
            for(const current of st) {
                for(var method = 0; method < aggs.length; method++) {
                    if(ranks[method][day].includes(current)) {
                        amt++
                    }
                }
            }
            // console.log(st)
            amt = amt/st.size
            //console.log("amt")
        // console.log(amt/aggs.length)
            
            xamt += topAmount/st.size
        }
        xamt = xamt/5
        globalXamt += xamt
    }
   /* console.log("End - Global Amount = ")
    console.log(((globalAmount/numOfTests) / topAmount) * 100 + "%")

    console.log("End - Global Coincidence = ")
    console.log((globalXamt/numOfTests) * 100 + "%")
*/
    return {
        amount: ((globalAmount/numOfTests) / topAmount) * 100,
        coincidence: (globalXamt/numOfTests) * 100
    }
}

var tops = [3, 5, 10]
var ratingsPow = [100, 250, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000]
for(let i = 0; i < tops.length; i++) {
    var topA = tops[i]
    let amount = []
    let coincidence = []
    for(let j = 0; j < ratingsPow.length; j++) {
        res = runTest(topA, ratingsPow[j])
        amount.push(res.amount)
        coincidence.push(res.coincidence)
    }
    console.log("Top " + topA + " results:")
    process.stdout.write("c(")
    for(let j = 0; j < ratingsPow.length - 1; j++) {
        process.stdout.write(amount[j] + ", ")
    }
    process.stdout.write("" + amount[ratingsPow.length - 1])
    console.log("),")
    process.stdout.write("c(")
    for(let j = 0; j < ratingsPow.length - 1; j++) {
        process.stdout.write(coincidence[j] + ", ")
    }
    process.stdout.write("" + coincidence[ratingsPow.length - 1])
    console.log(")")

}

