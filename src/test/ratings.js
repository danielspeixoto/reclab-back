const app = require('../main/app')
const axios = require('axios')
const Schedule = require('../main/data/Schedule')
const Rating = require('../main/data/Rating')
const User = require('../main/data/User')

const port = 9000

app.start({
    path: 'mongodb://localhost:27017/reclab',
    secret: 'secret'
}, port)

describe('Get scheduling for a user', () => {
    var userId = null
    it('User can login', done => {
        axios.post('http://127.0.0.1:' + port + "/user", {
            deviceId: '1'
        })
        .then(resp => {
            console.log(resp.data)
            userId = resp.data._id
            // const schedule = new Schedule({
            //     scheduleStart: 8,
            //     ScheduleEnd: 9,
            //     overallRating: 3
            // })
            
            // schedule.save(err => {
            //     if(err) {
            //         console.log(err)
            //     }
            // })
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })
    // if(userId != null) {
        
    // }
    it('Get /scheduling should return a scheduling for a user', done => {
        if(userId == null) {
            this.skip()
        }
        axios.get('http://127.0.0.1:' + port + "/scheduling", {
            userId: userId
        })
            .then(resp => {
                console.log(resp.data)
                done()
            })
            .catch(err => {
                console.log(err)
                done(err)
            })
    })

})    
