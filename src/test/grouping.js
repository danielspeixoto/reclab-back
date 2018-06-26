const assert = require ('chai').assert

const grouping = require('../main/domain/grouping/grouping')

describe('Grouping', () => {
    it("Day And Time", () => {
        ratings = [
            {noiseRating:null,crowdRating:null,_id:"5b20705dfc3fda0014f4992c",schedule:7,day: 0, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:null,crowdRating:null,_id:"5b207061fc3fda0014f4992d",schedule:7,day: 0, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:null,crowdRating:3,_id:"5b207087fc3fda0014f49932",schedule:7,day: 2, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:null,crowdRating:2,_id:"5b20710efc3fda0014f49933",schedule:7,day: 2, userId:"5b2070150f5fad6490fbb732",__v:0},
            {noiseRating:null,crowdRating:4,_id:"5b207112fc3fda0014f49934",schedule:7,day: 2, userId:"5b2070150f5fad6490fbb732",__v:0}
        ]

        const expected = [ 
            { noiseRating: null,   crowdRating: 3, _id: '5b207087fc3fda0014f49932', schedule: 7, day: 2, userId: '5b2070150f5fad6490fbb732', __v: 0 },
            { noiseRating: null, crowdRating: 2, _id: '5b20710efc3fda0014f49933', schedule: 7, day: 2, userId: '5b2070150f5fad6490fbb732', __v: 0 },
            { noiseRating: null, crowdRating: 4, _id: '5b207112fc3fda0014f49934', schedule: 7, day: 2, userId: '5b2070150f5fad6490fbb732', __v: 0 } ]

        assert(JSON.stringify(expected) == JSON.stringify(grouping.groupByDayAndTime(ratings)[2][0]))
    })

})
