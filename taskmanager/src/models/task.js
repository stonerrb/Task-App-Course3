const mongoose = require('mongoose')

const tasks = mongoose.model('task',{
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = tasks