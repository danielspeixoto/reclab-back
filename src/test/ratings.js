const app = require('../main/app')

app.start({
    path: 'mongodb://localhost:27017/reclab',
    secret: 'secret'
}, 8080)



