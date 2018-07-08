var get_rating = (rating) => {
    var total = 0
    if(rating.noise) {
        total += rating.noise
    }  
    if(rating.crowd) {
        total += rating.crowd
    }  
    if(rating.temperature) {
        total += rating.temperature
    }  
    if(rating.light) {
        total += rating.light
    }
   return total
}

module.exports.orderIndividualRanks = (ratings) => {
    var result = []
    for(let i = 0; i < ratings.length; i++) {
        userRating = ratings[i]
        userRating.sort((a, b) => {
            return get_rating(b) - get_rating(a) 
        })
        for(let j = 0; j < userRating.length; j++) {
            // If user has more than 10 ratings it will not superevaluate his favorites
            userRating[j].rating = Math.min(j, 10) 
            result.push(userRating[j])
        }
    }
    return result
}

var preprocess = (ratings) => {
    var result = this.orderIndividualRanks(ratings)
    result.sort((a,b) => {
        if(a.day == b.day) {
            return a.schedule - b.schedule
        }
        return a.day - b.day
    })

    result.forEach(element => {
       element.time = element.schedule 
    });
    return result
}

module.exports.calculate = (ratings) => {
    result = preprocess(ratings)
    return bordaCount(result)
}

var bordaCount = (ratings) => {
    var times = []

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

}

module.exports.calculateWithSensorData = (ratings, sensorData) => {
    return this.calculate(ratings.concat(sensorData))
}

//TODO Test
module.exports.calculateWithSensorRating = (ratings, sensorRating) => {
    ratings = this.preprocess(ratings)
    return this.bordaCount(ratings.concat(sensorRating))
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