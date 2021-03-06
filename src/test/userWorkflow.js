const app = require('../main/app')
const axios = require('axios')
const Rating = require('../main/data/Rating')
const User = require('../main/data/User')
const helpers = require('./helpers')

const assert = require ('chai').assert

const port = 9001

describe('Get scheduling for a user', () => {
    before((done) => {
        app.start({
            path: 'mongodb://localhost:27017/reclab'
        }, port, () => {
            helpers.dropDB(() => {
                // Actions to be done when DB is dropped
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
    if(userId == null) {
        it('User can vote for a specific schedule', done => {
            axios.post('http://127.0.0.1:' + port + "/rating", {
                userId,
                day: 0,
                schedule: 8,
                noiseRating: 5,
                temperatureRating: 5
            })
            .then(resp => {
                assert(resp.status == 200)
                done()
            })
            .catch(err => {
                console.log(err.body)
                done(err)
            })
        })

        it('Partners can retrieve ratings', done => {
            axios.get('http://127.0.0.1:' + port + "/rating", {})
            .then(resp => {
                assert(resp.data[0].noiseRating == 5)
                done()
            })
            .catch(err => {
                console.log(err.body)
                done(err)
            })
        })
        
        it('Get /scheduling should return a scheduling for a user', done => {  
            axios.get('http://127.0.0.1:' + port + "/scheduling/0", {
                day: '0'
            }).then(resp => {
                done()

            }).catch(err => {
                console.log(err.body)
                done(err)
            })
        })
    }
    
    
        
})    
