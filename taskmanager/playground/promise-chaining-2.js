require('../src/db/mongoose')

const tasks = require('../src/models/task')

tasks.findByIdAndDelete("6431557ac97f0e7c0c3db113").then((task) => {
    console.log(task)
    return tasks.countDocuments({completed: false})
}).then((result) => {
    console.log(result)
}).catch((e)=>{
    console.log(e)
})