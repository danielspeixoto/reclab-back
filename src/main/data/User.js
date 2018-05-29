const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    _id: {
        type: String
    }
})

const UserModel = module.exports = mongoose.model('User', schema)