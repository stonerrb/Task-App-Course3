require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate("6431557ac97f0e7c0c3db113", { age: 69 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 69})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAndCount = async (id,age) => {
    const user = await User.findByIdAndUpdate(id,{ age }) 
    const count = await User.countDocuments({age})
    return count    
}    

updateAndCount("6431557ac97f0e7c0c3db113",2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})