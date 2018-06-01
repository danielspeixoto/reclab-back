const app = require('./app.js')

app.start(
    {
        path: 
            process.env.MONGODB_URI ||
            "mongodb://localhost:27017/reclab",
        secret: 
            process.env.MONGO_SECRET ||
            "secret",
        user: process.env.MONGO_USER
    },
    process.env.PORT || 9000
)
