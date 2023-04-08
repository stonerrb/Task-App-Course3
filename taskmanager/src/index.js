const express = require("express");
require('./db/mongoose')

const User = require("./models/user") 
const tasks = require("./models/task") 

const app = express();
const port = process.env.PORT || 3000

// show output on screen
app.use(express.json())


//Create users
app.post('/users',(req,res) => {

    const user = new User(req.body)

    user.save().then((result) => {
        res.status(201).send(result)
    }).catch((error) => {
        res.status(400).send(error)
    })

})

//Create tasks
app.post('/task',(req,res) => {
    const task = new tasks(req.body)

    task.save().then((result) => {
        res.status(201).send(result);
    }).catch((error) => {
        res.status(400).send(error)
    })
})

//Read all Users
app.get('/users',(req,res) => {
    User.find({}).then((result) => {
        res.send(result)
    }).catch((e) => {
        res.status(500).send(e)
    })
}) 

//Read users by id
app.get('/users/:id',(req,res) => {

    const _id = req.params.id

    User.findById(_id).then((user) => {
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e) => {
        res.status(500).send(e)
    })
}) 

//read all tasks
app.get('/tasks',(req,res) => {
    tasks.find({}).then((result) => {
        res.send(result)
    }).catch((e) => {
        res.status(500).send(e)
    })
}) 

//read tasks by id
app.get('/tasks/:id',(req,res) => {

    const _id = req.params.id

    tasks.findById(_id).then((user) => {
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e) => {
        res.status(500).send(e)
    })
}) 

//console message to check port status
app.listen(port, () => {
    console.log("Server is up on port " + port)
})
