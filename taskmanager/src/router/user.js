const express = require("express");
const auth = require('../middleware/auth');
const User = require("../models/user");
const router = new express.Router()

//Create users
router.post('/users', async (req,res) => {
    const user = new User(req.body)

    try{
        await user.save()
        const token = await user.generateAuthToken()
        console.log(token)
        
        res.status(201).send({user,token})
    }catch(e){
        res.status(404).send(e)
    }
})

router.post('/users/login',async (req,res) => {
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})  
    } catch (error) {
        res.status(400).send(error)
    }   
})

//Read all Users
router.get('/users', auth,async (req,res) => {
    try{
        const users = await User.find({})
        res.send(users)
    }catch(e){
        res.status(500).send(e)
    }
}) 

//Read users by id
router.get('/users/:id',async (req,res) => {

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

//update users
router.patch('/users/:id',async (req,res) => {
    const updates = Object.keys
    const allowedUpdates = ["name","email","password","age"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation){
        return res.status(400).send({error:'Invaid Updates!'})
    }

    try{

        const user = await User.findById(req.params.id)

        updates.forEach((update) => user[update] = req.body[update]);

        await user.save();

        if(!user){
            return res.status(404).send()
        }

        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

//delete users
router.delete('/users/:id', async (req,res) => {
    try{
        const user = User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }
    catch(e){
        res.status(500).send()
    }
})

module.exports = router