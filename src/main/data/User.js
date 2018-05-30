const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: true
    }
})

const UserModel = module.exports = mongoose.model('User', schema)