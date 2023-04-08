const express = require("express");
require('./db/mongoose')

const User = require("./models/user") 
const tasks = require("./models/task"); 

const app = express();
const port = process.env.PORT || 3000

// show output on screen
app.use(express.json())


//Create users
app.post('/users', async (req,res) => {
    const user = new User(req.body)

    try{
        await user.save()
        res.status(201).send(user)
    }catch(e){
        res.status(404).send(e)
    }

})

//Create tasks
app.post('/task',async (req,res) => {
    const task = new tasks(req.body)

    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(404).send(e)
    }
})

//Read all Users
app.get('/users',async (req,res) => {
    try{
        const users = await User.find({})
        res.send(users)
    }catch(e){
        res.status(500).send(e)
    }
}) 

//Read users by id
app.get('/users/:id',async (req,res) => {

    const _id = req.params.id

    try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
}) 

//read all tasks
app.get('/tasks',async (req,res) => {
    try{
        const tasks = await tasks.find({})
        res.send(tasks)
    }catch(e){
        res.status(500).send(e)
    }
}) 

//read tasks by id
app.get('/tasks/:id',async (req,res) => {

    const _id = req.params.id

    try{
        const task = await tasks.findById(_id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
}) 

//console message to check port status
app.listen(port, () => {
    console.log("Server is up on port " + port)
})
