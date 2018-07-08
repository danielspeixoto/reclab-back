var get_rating = (rating) => {
    var total = 0
    amount = 0
    if(rating.noiseRating) {
        amount++
        total += rating.noiseRating
    }  
    if(rating.crowdRating) {
        amount++
        total += rating.crowdRating
    }  
    if(rating.temperatureRating) {
        amount++
        total += rating.temperatureRating
    }  
    if(rating.lightRating) {
        amount++
        total += rating.lightRating
    }
    if(rating.rating) {
        amount++
        total += rating.rating
    }
    if(amount != 0) {
        total /= amount
    }
   return total
}

module.exports.orderIndividualRanks = (ratings) => {
    var result = []
    for(let i = 0; i < ratings.length; i++) {
        let userRating = ratings[i]
        userRating.sort((a, b) => {
            return b.rating - a.rating 
        })
        // Ensures that user ratings starts at 5
        let aval = 10
        for(let j = 0; j < userRating.length; j++) {
            // If user has more than 10 ratings it will not superevaluate his favorites
            userRating[j].rating = Math.max(2, aval--)/2
            result.push(userRating[j])
        }
    }
    return result
}

var preprocess = (ratings) => {
    ratings.forEach(element => {
        element.forEach(item => {
            if(item.schedule) {
                item.time = item.schedule 
            }
            item.rating = get_rating(item)
        })
    });

    return ratings
}

var grouping = require('../grouping/grouping')

module.exports.calculate = (ratings) => {
    result = preprocess(grouping.groupByUser(ratings))
    result = this.orderIndividualRanks(result)
    return bordaCount(result)
}

var bordaCount = (ratings) => {
    var times = []

    result.sort((a,b) => {
        if(a.day == b.day) {
            return a.time - b.time
        }
        return a.day - b.day
    })

    for(let i = 0; i < ratings.length;) {
        var day = ratings[i].day
        var time = ratings[i].time
        var amount = 0
        while(i < ratings.length && day == ratings[i].day && time == ratings[i].time) {
            amount += ratings[i].rating
            i++
        }
        times.push({
            time, day,
            rating: amount
        })
    }
    return times
}

module.exports.calculateWithSensorData = (ratings, sensorData) => {
    return this.calculate(ratings.concat(sensorData))
}

module.exports.calculateWithSensorRating = (ratings, sensorRating) => {
    
    ratings = this.calculate(ratings.concat(sensorRating))
    return ratings
}

module.exports.groupByUser= (ratings) => {
    var grouped = []
    ratings.sort((a, b) => {
        if (b.userId < a.userId) return -1
        if (a.userId < b.userId) return 1
        return 0
    })
    
    for(let i = 0; i < ratings.length;) {
        let user = ratings[i].userId
        let userReports = []
        while(i <  ratings.length && ratings[i].userId == user) {
            userReports.push(ratings[i])
            i++
        }
        grouped.push(userReports)
    }

    return grouped
}