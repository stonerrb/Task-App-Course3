const mongoose = require('mongoose')
const validator = require('validator')
const crypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String, 
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
})


userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'isthisthetoken')

    user.tokens = user.token.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({email:email})

    if(!user){ 
        throw new Error("No User found with diz email")
    }

    const isMatch = await crypt.compare(password, user.password)

    if (!isMatch){
        throw new Error('Unable to login')
    }

    return user
}

//Hash the pain password
userSchema.pre('save', async function (next){
    const user = this;

    if (user.isModified('password')){
        user.password = await crypt.hash(user.password,8)
    }

    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User