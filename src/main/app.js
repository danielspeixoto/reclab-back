const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser")
const mongoose = require('mongoose')

const scheduling = require('./domain/scheduling.js')
const Rating = require('./data/Rating.js')
const User = require('./data/User.js')

module.exports.start = (config, port, done) => {
    
    mongoose.connect(config.path).then(connection => {
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
    app.get("/scheduling/:day", (req, res) => {
        console.log("/scheduling/" + req.params.day)
        console.log(req.body)
        scheduling.getSchedules(req.params.day, (err, schedules) => {
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
        let result = {
            ...req.body,
            ...req.body.ratings,
            schedule: req.body.schedule + 7
        }
        console.log(result)
        let rating = new Rating(result)
        rating.save(err => {
            if(err){
                console.log(err)
                res.sendStatus(500)
            } else {
                res.sendStatus(200)
            }
        })
    })
    
    app.get("/rating", (req, res) => {
        Rating.find({}, (err, ratings) => {
            if(err) {
                console.log(err)
                res.sendStatus(500)
            } else {
                res.send(ratings)
            }
        })
    })

    app.post("/user", (req, res) => {
        console.log(req.body)
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

    app.get("/", (req, res) => {
        res.send(`
        Endpoints List: <br>
        GET /scheduling/:day -> Recomendacao para um dado dia <br>
        GET /rating -> Visualiza as avaliacoes <br>
        POST /rating -> Publica uma avaliacao. Formato abaixo:<br>
        { <br>
        ----userId: (string), <br>
        ----crowdRating: (int de 1 ate 5), <br>
        ----lightRating: (int de 1 ate 5), <br>
        ----temperatureRating: (int de 1 ate 5), <br>
        ----noiseRating: (int de 1 ate 5), <br>
        ----schedule: (int de 7 ate 22), Referente ao horario <br>
        ----day: (int de 0 ate 4) Sendo segunda 0 <br>
        } <br>
        `)
    })
    
    // Start Server
    app.listen(port, () => {
        console.log("Server started on port " + port)
    })
}