module.exports.calculate = (ratings) => {
    var results = []
    for(let i = 0; i < ratings.length;) {
        let time = ratings[i].schedule
        let day = ratings[i].day
        let crowd = 1
        let crowdCounting = 0
        let light = 1
        let lightCounting = 0
        let temperature = 1
        let temperatureCounting = 0
        let noise = 1
        let noiseCounting = 0
        while(i <  ratings.length && time == ratings[i].schedule && day == ratings[i].day) {
            if(ratings[i].crowdRating != null) {
                crowd *= ratings[i].crowdRating
                crowdCounting++
            }
            if(ratings[i].lightRating != null) {
                light *= ratings[i].lightRating
                lightCounting++
            }
            if(ratings[i].temperatureRating != null) {
                temperature *= ratings[i].temperatureRating
                temperatureCounting++
            }
            if(ratings[i].noiseRating != null) {
                noise *= ratings[i].noiseRating
                noiseCounting++
            }
            i++
        }
        if(crowdCounting == 0) {
            crowdCounting = 1
            crowd = 3
        }
        if(lightCounting == 0) {
            lightCounting = 1
            light = 3
        }
        if(temperatureCounting == 0) {
            temperatureCounting = 1
            temperature = 3
        }
        if(noiseCounting == 0) {
            noiseCounting = 1
            noise = 3
        }
        var result = {
            time, day,
            crowd : Number(Math.pow(crowd, 1/crowdCounting).toPrecision(2)),
            light : Number(Math.pow(light, 1/lightCounting).toPrecision(2)),
            temperature : Number(Math.pow(temperature, 1/temperatureCounting).toPrecision(2)),
            noise : Number(Math.pow(noise, 1/noiseCounting).toPrecision(2)),
        }
        results.push(unify_rating(result))   
    }
    return results
}

module.exports.calculateWithSensorData = (ratings, sensorData) => {
    return this.calculate(ratings.concat(sensorData))
}

var groupRating = require('../grouping/ratings')
var grouping = require('../grouping/grouping')

//TODO Test
module.exports.calculateWithSensorRating = (ratings, sensorRating) => {
    ratings = this.calculate(ratings)
    ratings = groupRating.multiplicative(grouping.groupByDayAndTime(ratings),
        grouping.groupByDayAndTime(sensorRating))
    result = []
    for(let i = 0; i < ratings.length; i++) {
        for(let j = 0; j < ratings[i].length; j++) {
            for(let k = 0; k < ratings[i][j].length; k++) {
                result.push(ratings[i][j][k])
            }
        }
    }
    return result
}

function unify_rating(rating) {
    rating.rating = (rating.noise + rating.crowd + rating.temperature + rating.light) / 4
    return rating
}