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