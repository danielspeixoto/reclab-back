const assert = require ('chai').assert

const averageWithoutMisery = require('../../main/domain/aggregation/averageWithoutMisery')
const average = require('../../main/domain/aggregation/average')
const grouping = require('../../main/domain/grouping/grouping')

describe('Average without misery', () => {
    it("Calculate", () => {
        ratings = [
            {noiseRating:null,crowdRating:2,_id:"5b20704ffc3fda0014f4992b",schedule:7,day: 0, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:null,crowdRating:null,_id:"5b20705dfc3fda0014f4992c",schedule:7,day: 0, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:null,crowdRating:3,_id:"5b207087fc3fda0014f49932",schedule:7,day: 2, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:null,crowdRating:2,_id:"5b20710efc3fda0014f49933",schedule:7,day: 2, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:null,crowdRating:4,_id:"5b207112fc3fda0014f49934",schedule:7,day: 2, userId:"5b2070150f5fad6490fbb732",__v:0}
        ]
        const expected = [ { time: 7,
            day: 0,
            crowd: 2,
            light: 3,
            temperature: 3,
            noise: 3,
            rating: 2.75 },
          { time: 7,
            day: 2,
            crowd: 3.5,
            light: 3,
            temperature: 3,
            noise: 3,
            rating: 3.125 } ]

        var miseries = grouping.groupByDayAndTime(average.calculate([
            {
                schedule: 7,
                day: 2,
                crowdRating: 5,
                noiseRating: 5,
                temperatureRating: 2,
                lightRating: 1
            }
        ]))
        assert(JSON.stringify(expected) == JSON.stringify(averageWithoutMisery.calculate(ratings, miseries)))
    })

    it("Using sensor data", () => {
        ratings = [
            {noiseRating:null,crowdRating:2,_id:"5b20704ffc3fda0014f4992b",schedule:7,day: 0, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:null,crowdRating:null,_id:"5b20705dfc3fda0014f4992c",schedule:7,day: 0, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:null,crowdRating:3,_id:"5b207087fc3fda0014f49932",schedule:7,day: 2, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:null,crowdRating:2,_id:"5b20710efc3fda0014f49933",schedule:7,day: 2, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:null,crowdRating:4,_id:"5b207112fc3fda0014f49934",schedule:7,day: 2, userId:"5b2070150f5fad6490fbb732",__v:0}
        ]
        const expected =[ { time: 7,
    day: 0,
    crowd: 2,
    light: 3,
    temperature: 3,
    noise: 3,
    rating: 2.75 },
  { time: 7,
    day: 2,
    crowd: 4.3,
    light: 2,
    temperature: 1,
    noise: 6,
    rating: 3.325 } ]

        var miseries = [
            {
                schedule: 7,
                day: 2,
                crowdRating: 6,
                noiseRating: 6,
                temperatureRating: 1,
                lightRating: 2
            }
        ]
        assert(JSON.stringify(expected) == JSON.stringify(averageWithoutMisery.calculateWithSensorData(ratings, miseries)))
    })

    it("Sensor Rating", () => {
        ratings = [
            {schedule:7,day: 2, userId:"5b2070150f5fad6490fbb732",__v:0},
            {crowdRating: 5, noiseRating: 5, temperatureRating: 5, lightRating: 5, schedule:7,day: 2, userId:"5b2070150f5fad6490fbb732",__v:0}
        ]

        const expected = [ { time: 7, day: 2, rating: 4.5 } ]

        var sensorData = [
            { rating:4, time: 7,day: 2, userId:"-1",__v:0 }
        ]

        assert(JSON.stringify(expected) == JSON.stringify(averageWithoutMisery.calculateWithSensorRating(ratings, sensorData)))
    
    })
})
