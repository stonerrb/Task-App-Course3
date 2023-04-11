const express = require("express");
require('./db/mongoose')

const User = require("./models/user") 
const tasks = require("./models/task"); 
const userRouter = require("./router/user")
const taskRouter = require("./router/task")

const app = express();
const port = process.env.PORT || 3000

// a login id
// {
//    "email": "jpop@gmail.com",
//    "password": "osaka@12345"
//}


// app.use((req,res,next) => {
//     if(req.method === "GET"){
//         res.send('GET request are disabled')
//     }else {
//         next()
//     }
// })

// app.use((req,res,next) => {
//     res.status(503).send("The server is currently undergoing maintainance")
// })

// show output on screen
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

// Diagram Working with middleware
//NOTE :- This may hinder the working of the whole application, most changes should be provided by githud, just in case i am putting this comment /in changed spaces at the end 
//*//

//
// Without middleware: new request -> run route handler
//
// With middeware: new request -> do something -> run route handler
//

const jwt = require("jsonwebtoken")

const myFun = async () => {
    const token = jwt.sign({_id:'abc123'}, 'isthisthetoken', {expiresIn: '7 days'})

    console.log(jwt.verify(token,'isthisthetoken'))
}

//myFun()

//console message to check port status
app.listen(port, () => {
    console.log("Server is up on port " + port)
})