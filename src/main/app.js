const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser")
const mongoose = require('mongoose')

const scheduling = require('./domain/scheduling.js')
const Rating = require('./data/Rating.js')
const User = require('./data/User.js')

module.exports.start = (db, port, done) => {
    
    mongoose.connect(db.path).then(connection => {
        console.log("Connected to database")
        if(done != null) {
            done()
        }
    }).catch(err => {
        console.log(err)
    })

    const app = express()
    
    // Body Parser Middleware
    app.use(bodyParser.json())
    
    // Routes
    app.get("/scheduling", (req, res) => {
        scheduling.getSchedules(req.body.userId, (err, schedules) => {
            if(err) {
                console.log('Error at scheduling')
                console.log(err)
                res.sendStatus(500)
            } else {
                res.json(schedules)
            }
    
        }) 
    })
    
    app.post("/rating", (req, res) => {
        let rating = new Rating(req.body)
        rating.save(err => {
            if(err){
                console.log(err)
                res.sendStatus(500)
            } else {
                res.sendStatus(200)
            }
        })
    })
    
    app.post("/user", (req, res) => {
        User.findOneAndUpdate({
            deviceId: req.body.deviceId
        }, 
        {
            deviceId: req.body.deviceId
        },
        { upsert: true, new: true },
        (err, user) => {
            if(err){
                console.log(err)
                res.sendStatus(501)
            
            } else {
                res.json(user)
                res.status(200)
            }
        })
    })
    
    // Start Server
    app.listen(port, () => {
        console.log("Server started on port " + port)
    })
}