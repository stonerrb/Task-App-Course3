const mongoose = require("mongoose")

const user_schema = mongoose.Schema({
    fname:String,
    lname:String
})

const User = mongoose.model("user",user_schema)

module.exports = User