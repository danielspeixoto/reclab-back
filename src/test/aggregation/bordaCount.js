const assert = require ('chai').assert

const bordaCount = require('../../main/domain/aggregation/bordaCount')

describe('Borda Count', () => {
    it("Group user ratings", () => {
        ratings = [
            {noiseRating:1,crowdRating:2,_id:"5b20649ffc3fda0014f49928",schedule:11,day: 0, userId:"5b20648f0f5fad6490fae559",temperatureRating:2,lightRating:4,__v:0},
            {noiseRating:null,crowdRating:2,_id:"5b20704ffc3fda0014f4992b",schedule:7,day: 0, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:null,crowdRating:null,_id:"5b207061fc3fda0014f4992d",schedule:7,day: 0, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:1,crowdRating:1,_id:"5b2064d8fc3fda0014f4992a",schedule:12,day: 0, userId:"5b20648f0f5fad6490fae559",temperatureRating:1,lightRating:3,__v:0},
            {noiseRating:null,crowdRating:2,_id:"5b207071fc3fda0014f4992e",schedule:7,day: 2, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:null,crowdRating:4,_id:"5b207112fc3fda0014f49934",schedule:7,day: 2, userId:"5b2070150f5fad6490fbb732",__v:0}
        ]

        var expected = JSON.stringify([ [ { noiseRating: 1,
            crowdRating: 2,
            _id: '5b20649ffc3fda0014f49928',
            schedule: 11,
            day: 0,
            userId: '5b20648f0f5fad6490fae559',
            temperatureRating: 2,
            lightRating: 4,
            __v: 0 },
          { noiseRating: 1,
            crowdRating: 1,
            _id: '5b2064d8fc3fda0014f4992a',
            schedule: 12,
            day: 0,
            userId: '5b20648f0f5fad6490fae559',
            temperatureRating: 1,
            lightRating: 3,
            __v: 0 } ],
        [ { noiseRating: null,
            crowdRating: null,
            _id: '5b207061fc3fda0014f4992d',
            schedule: 7,
            day: 0,
            userId: '5b2070150f5fad6490fbb732',
            __v: 0 },
        { noiseRating: null,
            crowdRating: null,
            _id: '5b207061fc3fda0014f4992d',
            schedule: 7,
            day: 0,
            userId: '5b2070150f5fad6490fbb732',
            __v: 0 },
          { noiseRating: null,
            crowdRating: 2,
            _id: '5b207071fc3fda0014f4992e',
            schedule: 7,
            day: 2,
            userId: '5b2070150f5fad6490fbb732',
            __v: 0 },
          { noiseRating: null,
            crowdRating: 4,
            _id: '5b207112fc3fda0014f49934',
            schedule: 7,
            day: 2,
            userId: '5b2070150f5fad6490fbb732',
            __v: 0 },
         ] ])

        assert( expected = JSON.stringify(bordaCount.groupByUser(ratings)))
    })


    it('Calculate Rating', () => {

      ratings = [
        {lightRating: 2, temperatureRating: 2, noiseRating:2,crowdRating:2,_id:"5b207071fc3fda0014f4992e",schedule:7,day: 2, userId:"5b2070150f5fad6490fbb732",__v:0}
      ]
    
      var sensorData = [
          { rating:5, time:7,day: 2, userId:"-1",__v:0 }
      ]
      const expected = [ { time: 7, day: 2, rating: 5 } ]

      assert(JSON.stringify(expected) == JSON.stringify(bordaCount.calculate(ratings)))
    })

    it('Sensor Rating', () => {

      ratings = [
        {lightRating: 2, temperatureRating: 2, noiseRating:2,crowdRating:2,_id:"5b207071fc3fda0014f4992e",schedule:7,day: 2, userId:"5b2070150f5fad6490fbb732",__v:0}
      ]
    
      var sensorData = [
          { rating:5, time:7,day: 2, userId:"-1",__v:0 }
      ]
      const expected = [ { time: 7, day: 2, rating: 10 } ]

      assert(JSON.stringify(expected) == JSON.stringify(bordaCount.calculateWithSensorRating(ratings, sensorData)))
    })
})
