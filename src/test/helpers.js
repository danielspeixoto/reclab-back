const mongoose = require('mongoose')

module.exports.dropDB = (done) => { 
    // console.log("MOngoose connection = " + JSON.stringify(mongoose.connection))
    mongoose.connection.db.dropDatabase(function (err) {
        if(err) {
            console.log(err)
        } else {
            console.log('db dropped');
        }
        if(done != null) {
            done()
        }
      })
}