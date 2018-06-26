module.exports.calculate = (ratings) => {
    var results = []
    for(let i = 0; i < ratings.length;) {
        let time = ratings[i].schedule
        let day = ratings[i].day
        let crowd = 0
        let crowdCounting = 0
        let light = 0
        let lightCounting = 0
        let temperature = 0
        let temperatureCounting = 0
        let noise = 0
        let noiseCounting = 0
        while(i <  ratings.length && time == ratings[i].schedule && day == ratings[i].day) {
            if(ratings[i].crowdRating != null) {
                crowd += ratings[i].crowdRating
                crowdCounting++
            }
            if(ratings[i].lightRating != null) {
                light += ratings[i].lightRating
                lightCounting++
            }
            if(ratings[i].temperatureRating != null) {
                temperature += ratings[i].temperatureRating
                temperatureCounting++
            }
            if(ratings[i].noiseRating != null) {
                noise += ratings[i].noiseRating
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
            crowd : Number((crowd/crowdCounting).toPrecision(2)),
            light : Number((light/lightCounting).toPrecision(2)),
            temperature : Number((temperature/temperatureCounting).toPrecision(2)),
            noise : Number((noise/noiseCounting).toPrecision(2)),
        }
        results.push(unify_rating(result))
    }
    return results
}

module.exports.calculateWithSensorData = (ratings, sensorData) => {
    var advantage = 20
    var sensorHeavy = []
    for(let i = 0; i < sensorData.length; i++) {
        for( let j = 0; j < advantage; j++) {       
            ratings.push(sensorData[i])
        }
    }
    return calculate(ratings)
}

module.exports.groupByDay= (ratings) => {
    var grouped = []
    for(let i = 0; i < 5; i++) {
        let day = []
        grouped.push(day)
    }
    for(let i = 0; i < ratings.length; i++) {
        grouped[ratings[i].day].push(ratings[i])
    }

    return grouped
}

function unify_rating(rating) {
    rating.rating = rating.noise + rating.crowd + rating.temperature + rating.light
    return rating
}