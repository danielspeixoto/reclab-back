const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser")

const scheduling = require('./domain/scheduling.js')

mongoose.connect({
    database: process.env.MONGO_DB || 'mongodb://localhost:27017/reclab',
    secret: process.env.MONGO_SECRET || "secret"
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

// Port Number
const port = process.env.PORT || 8080

// Body Parser Middleware
app.use(bodyParser.json())

// Routes
app.get("/scheduling", (req, res) => {
    res.send("Invalid Endpoint")
})

// Start Server
app.listen(port, () => {
    console.log("Server started on port " + port)
})