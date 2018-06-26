var num_days = 5
var num_times = 16
var initial_time = 7

module.exports.recommend = (ratings, day) => {
    ratings = ratings[day]
    daySchedules = schedules[day].slice()
    // Assign user rating
    for(let i = 0; i < ratings.length; i++) {
        daySchedules[ratings[i].time - initial_time].rating = ratings[i].rating
    }

    // Sorts
    daySchedules.sort((a, b) => {
        if(b.rating == a.rating) {
            return a.time - b.time
        }
        return b.rating - a.rating
    })
    return daySchedules
}

var schedules = [ 
    [
    {"day":0,"time":7,"rating":0},
    {"day":0,"time":8,"rating":0},
    {"day":0,"time":9,"rating":0},
    {"day":0,"time":10,"rating":0},
    {"day":0,"time":11,"rating":0},
    {"day":0,"time":12,"rating":0},
    {"day":0,"time":13,"rating":0},
    {"day":0,"time":14,"rating":0},
    {"day":0,"time":15,"rating":0},
    {"day":0,"time":16,"rating":0},
    {"day":0,"time":17,"rating":0},
    {"day":0,"time":18,"rating":0},
    {"day":0,"time":19,"rating":0},
    {"day":0,"time":20,"rating":0},
    {"day":0,"time":21,"rating":0},
    {"day":0,"time":22,"rating":0},
],[
    {"day":1,"time":7,"rating":0},
    {"day":1,"time":8,"rating":0},
    {"day":1,"time":9,"rating":0},
    {"day":1,"time":10,"rating":0},
    {"day":1,"time":11,"rating":0},
    {"day":1,"time":12,"rating":0},
    {"day":1,"time":13,"rating":0},
    {"day":1,"time":14,"rating":0},
    {"day":1,"time":15,"rating":0},
    {"day":1,"time":16,"rating":0},
    {"day":1,"time":17,"rating":0},
    {"day":1,"time":18,"rating":0},
    {"day":1,"time":19,"rating":0},
    {"day":1,"time":20,"rating":0},
    {"day":1,"time":21,"rating":0},
    {"day":1,"time":22,"rating":0},
],[
    {"day":2,"time":7,"rating":0},
    {"day":2,"time":8,"rating":0},
    {"day":2,"time":9,"rating":0},
    {"day":2,"time":10,"rating":0},
    {"day":2,"time":11,"rating":0},
    {"day":2,"time":12,"rating":0},
    {"day":2,"time":13,"rating":0},
    {"day":2,"time":14,"rating":0},
    {"day":2,"time":15,"rating":0},
    {"day":2,"time":16,"rating":0},
    {"day":2,"time":17,"rating":0},
    {"day":2,"time":18,"rating":0},
    {"day":2,"time":19,"rating":0},
    {"day":2,"time":20,"rating":0},
    {"day":2,"time":21,"rating":0},
    {"day":2,"time":22,"rating":0},
],[
    {"day":3,"time":7,"rating":0},
    {"day":3,"time":8,"rating":0},
    {"day":3,"time":9,"rating":0},
    {"day":3,"time":10,"rating":0},
    {"day":3,"time":11,"rating":0},
    {"day":3,"time":12,"rating":0},
    {"day":3,"time":13,"rating":0},
    {"day":3,"time":14,"rating":0},
    {"day":3,"time":15,"rating":0},
    {"day":3,"time":16,"rating":0},
    {"day":3,"time":17,"rating":0},
    {"day":3,"time":18,"rating":0},
    {"day":3,"time":19,"rating":0},
    {"day":3,"time":20,"rating":0},
    {"day":3,"time":21,"rating":0},
    {"day":3,"time":22,"rating":0},
],[
    {"day":4,"time":7,"rating":0},
    {"day":4,"time":8,"rating":0},
    {"day":4,"time":9,"rating":0},
    {"day":4,"time":10,"rating":0},
    {"day":4,"time":11,"rating":0},
    {"day":4,"time":12,"rating":0},
    {"day":4,"time":13,"rating":0},
    {"day":4,"time":14,"rating":0},
    {"day":4,"time":15,"rating":0},
    {"day":4,"time":16,"rating":0},
    {"day":4,"time":17,"rating":0},
    {"day":4,"time":18,"rating":0},
    {"day":4,"time":19,"rating":0},
    {"day":4,"time":20,"rating":0},
    {"day":4,"time":21,"rating":0},
    {"day":4,"time":22,"rating":0}
]
    ]