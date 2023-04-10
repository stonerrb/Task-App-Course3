const express = require("express");
require('./db/mongoose')

const User = require("./models/user") 
const tasks = require("./models/task"); 
const userRouter = require("./router/user")
const taskRouter = require("./router/task")

const app = express();
const port = process.env.PORT || 3000

// show output on screen
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const jwt = require("jsonwebtoken")

const myFun = async () => {
    const token = jwt.sign({_id:'abc123'}, 'isthisthetoken', {expiresIn: '7 days'})
    console.log(token)

    console.log(jwt.verify(token,'isthisthetoken'))
}

myFun()

//console message to check port status
app.listen(port, () => {
    console.log("Server is up on port " + port)
})