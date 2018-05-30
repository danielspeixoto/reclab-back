const app = require('./app.js')

app.start(
    {
        path: 
            // process.env.MONGO_DB ||
            "mongodb://localhost:27017/reclab",
        secret: 
            // process.env.MONGO_SECRET ||
            "secret"
    },
    // process.env.PORT ||
    9000
)
