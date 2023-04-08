require('../src/db/mongoose')

const User = require('../src/models/user')

User.findByIdAndUpdate("6431557ac97f0e7c0c3db113", { age: 69 }).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 69})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})