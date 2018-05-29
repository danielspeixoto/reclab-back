const app = require('../main/app')
const axios = require('axios')
const Schedule = require('../main/data/Schedule')
const Rating = require('../main/data/Rating')
const User = require('../main/data/User')

const port = 8080

app.start({
    path: 'mongodb://localhost:27017/reclab',
    secret: 'secret'
}, port)

const schedule = new Schedule({
    scheduleStart: 8,
    ScheduleEnd: 9,
    overallRating: 3
})

schedule.save(err => {
    console.log(err)
})

axios.get('localhost:' + port + "/scheduling")
    .then(resp => {
        console.log(resp)
    })



