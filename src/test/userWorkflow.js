const app = require('../main/app')
const axios = require('axios')
const Schedule = require('../main/data/Schedule')
const Rating = require('../main/data/Rating')
const User = require('../main/data/User')
const helpers = require('./helpers')

const assert = require ('chai').assert

const port = 9000

describe('Get scheduling for a user', () => {
    before((done) => {
        app.start({
            path: 'mongodb://localhost:27017/reclab'
        }, port, () => {
            helpers.dropDB(() => {
                // TODO Increase amount of mocks created
                const schedule = new Schedule({
                    hourStart: 8,
                    day: 0,
                    hourEnd: 9,
                    overallRating: 3
                })
                    
                schedule.save(err => {
                    if(err) {
                        done(err)
                    }
                })
                done()
            })
            })
    }) 
    var userId = null
    it('User can login', done => {
        axios.post('http://127.0.0.1:' + port + "/user", {
            deviceId: '1'
        }) 
        .then(resp => {
            // TODO Do asserts about user
            console.log(resp.data)
            userId = resp.data._id
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })

    let scheduleId = null
    it('Get /scheduling should return a scheduling for a user', done => {
        if(userId == null) {
            this.skip()
        }
        axios.get('http://127.0.0.1:' + port + "/scheduling", {
            userId: userId

        }).then(resp => {
            // TODO Do asserts about list of schedules
            console.log(resp.data)
            scheduleId = resp.data[0]._id
            done()

        }).catch(err => {
            console.log(err)
            done(err)
        })
    })
    
    it('User can vote for a specific schedule', done => {
        if(scheduleId == null) {
            this.skip()
        }
        axios.post('http://127.0.0.1:' + port + "/rating", {
            userId,
            scheduleId,
            day: 0,
            noiseRating: 5,
            temperatureRating: 5
        })
        .then(resp => {
            assert(resp.status == 200)
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })
})    
