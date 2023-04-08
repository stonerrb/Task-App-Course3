const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User',{
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid!!")
            }
        }
    },
    age: {
        type: Number,
        default:0,
        validate(value) {
            if(value<0){
                throw new Error("Age needs to be +ve")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.length < 8){
                throw new Error('Password must be at least 8 characters')
            }
            else if(value.includes("password")){
                throw new Error('Password should not contain password!')
            }
        }
    }
})

module.exports = User