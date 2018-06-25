const assert = require ('chai').assert

const average = require('../main/domain/aggregation/average')
const multiplicative = require('../main/domain/aggregation/multiplicative')

describe('Aggregation methods', () => {
    it("Average", () => {
        ratings = [
            {noiseRating:1,crowdRating:2,_id:"5b20649ffc3fda0014f49928",schedule:11,day: 0, userId:"5b20648f0f5fad6490fae559",temperatureRating:2,lightRating:4,__v:0},
            {noiseRating:5,crowdRating:5,_id:"5b2064bbfc3fda0014f49929",schedule:19,day: 0, userId:"5b20648f0f5fad6490fae559",temperatureRating:5,lightRating:5,__v:0},
            {noiseRating:1,crowdRating:1,_id:"5b2064d8fc3fda0014f4992a",schedule:12,day: 0, userId:"5b20648f0f5fad6490fae559",temperatureRating:1,lightRating:3,__v:0},
            {noiseRating:null,crowdRating:2,_id:"5b20704ffc3fda0014f4992b",schedule:7,day: 0, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:null,crowdRating:null,_id:"5b20705dfc3fda0014f4992c",schedule:7,day: 0, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:null,crowdRating:null,_id:"5b207061fc3fda0014f4992d",schedule:7,day: 0, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:null,crowdRating:2,_id:"5b207071fc3fda0014f4992e",schedule:7,day: 2, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:null,crowdRating:2,_id:"5b207071fc3fda0014f4992f",schedule:7,day: 2, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:null,crowdRating:2,_id:"5b207071fc3fda0014f49930",schedule:7,day: 2, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:null,crowdRating:2,_id:"5b207071fc3fda0014f49931",schedule:7,day: 2, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:null,crowdRating:3,_id:"5b207087fc3fda0014f49932",schedule:7,day: 2, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:null,crowdRating:2,_id:"5b20710efc3fda0014f49933",schedule:7,day: 2, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:null,crowdRating:4,_id:"5b207112fc3fda0014f49934",schedule:7,day: 2, userId:"5b2070150f5fad6490fbb732",__v:0}
        ]

        const expected = [ [ { time: 11, day: 0, crowd: 2, light: 4, temperature: 2, noise: 1 },
            { time: 19, day: 0, crowd: 5, light: 5, temperature: 5, noise: 5 },
            { time: 12, day: 0, crowd: 1, light: 3, temperature: 1, noise: 1 },
            { time: 7, day: 0, crowd: 2, light: 3, temperature: 3, noise: 3 } ],
          [],
          [ { time: 7, day: 2, crowd: 2.4, light: 3, temperature: 3, noise: 3 } ],
          [],
          [] ]

        // console.log(aggregation.groupByDay(aggregation.average(ratings)))

        assert(JSON.stringify(expected) == JSON.stringify(average.groupByDay(average.calculate(ratings))))
    })

    it("Multiplicative", () => {
        ratings = [
            {noiseRating:1,crowdRating:2,_id:"5b20649ffc3fda0014f49928",schedule:11,day: 0, userId:"5b20648f0f5fad6490fae559",temperatureRating:2,lightRating:4,__v:0},
            {noiseRating:5,crowdRating:5,_id:"5b2064bbfc3fda0014f49929",schedule:19,day: 0, userId:"5b20648f0f5fad6490fae559",temperatureRating:5,lightRating:5,__v:0},
            {noiseRating:1,crowdRating:1,_id:"5b2064d8fc3fda0014f4992a",schedule:12,day: 0, userId:"5b20648f0f5fad6490fae559",temperatureRating:1,lightRating:3,__v:0},
            {noiseRating:null,crowdRating:2,_id:"5b20704ffc3fda0014f4992b",schedule:7,day: 0, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:null,crowdRating:null,_id:"5b20705dfc3fda0014f4992c",schedule:7,day: 0, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:null,crowdRating:null,_id:"5b207061fc3fda0014f4992d",schedule:7,day: 0, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:null,crowdRating:2,_id:"5b207071fc3fda0014f4992e",schedule:7,day: 2, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:null,crowdRating:2,_id:"5b207071fc3fda0014f4992f",schedule:7,day: 2, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:null,crowdRating:3,_id:"5b207071fc3fda0014f49930",schedule:7,day: 2, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:null,crowdRating:2,_id:"5b207071fc3fda0014f49931",schedule:7,day: 2, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:null,crowdRating:2,_id:"5b207087fc3fda0014f49932",schedule:7,day: 2, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:null,crowdRating:2,_id:"5b20710efc3fda0014f49933",schedule:7,day: 2, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:null,crowdRating:4,_id:"5b207112fc3fda0014f49934",schedule:7,day: 2, userId:"5b2070150f5fad6490fbb732",__v:0}
        ]

        const expected = [ { time: 11, day: 0, crowd: 2, light: 4, temperature: 2, noise: 1 },
            { time: 19, day: 0, crowd: 5, light: 5, temperature: 5, noise: 5 },
            { time: 12, day: 0, crowd: 1, light: 3, temperature: 1, noise: 1 },
            { time: 7, day: 0, crowd: 2, light: 3, temperature: 3, noise: 3 },
            { time: 7, day: 2, crowd: 2.3, light: 3, temperature: 3, noise: 3 } ]

        assert(JSON.stringify(expected) == JSON.stringify(multiplicative.calculate(ratings)))
    })
})
