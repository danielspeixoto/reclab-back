const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser")

const scheduling = require('./domain/scheduling.js')
const Rating = require('data/Rating.js')
const User = require('data/User.js')

module.exports.start = (db, port) => {
    mongoose.connect({
        database: db.path,
        secret: db.secret
    })
    
    // On Connection
    mongoose.connection.on("connected", () => {
        console.log("Connected to database " + config.database)
    })
    
    // On Error
    mongoose.connection.on("error", (err) => {
        console.log("Database error: " + err)
    })
    
    const app = express()

    
    // Body Parser Middleware
    app.use(bodyParser.json())
    
    // Routes
    app.get("/scheduling", (req, res) => {
        scheduling.getSchedules(req.body._id, (schedules, err) => {
            if(err) {
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
        //TODO
    })
    
    // Start Server
    app.listen(port, () => {
        console.log("Server started on port " + port)
    })
}