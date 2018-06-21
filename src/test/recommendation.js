const assert = require ('chai').assert

const recommendation = require('../main/domain/recommendation')

describe('Recommendation methods', () => {
    it("Sum", () => {
        const ratings = [
            [
                { time: 11, day: 0, crowd: 2, light: 4, temperature: 2, noise: 1 },
                { time: 19, day: 0, crowd: 5, light: 5, temperature: 5, noise: 5 },
                { time: 12, day: 0, crowd: 1, light: 3, temperature: 1, noise: 1 },
                { time: 7, day: 0, crowd: 2, light: 3, temperature: 3, noise: 3 },
            ],
            [],
            [
                { time: 7, day: 2, crowd: 2.4, light: 3, temperature: 3, noise: 3 }
            ]
        ] 

        
        assert(JSON.stringify(expected) == JSON.stringify(aggregation.recommend(ratings, 0)))
    })
})
