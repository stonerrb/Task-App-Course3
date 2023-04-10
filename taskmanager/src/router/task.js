const express = require("express");
const router = new express.Router();
const tasks = require("../models/task");


//Create tasks
router.post('/task',async (req,res) => {
    
    const task = new tasks(req.body)

    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(404).send(e)
    }
})

//read all tasks
router.get('/tasks',async (req,res) => {
    try{
        const tasks = await tasks.find({})
        res.send(tasks)
    }catch(e){
        res.status(500).send(e)
    }
}) 

//read tasks by id
router.get('/tasks/:id',async (req,res) => {

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

router.patch('/tasks/:id',async (req,res) => {
    const updates = Object.keys
    const allowedUpdates = ["description","completed"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation){
        return res.status(400).send({error:'Invaid Updates!'})
    }

    try{

        const task = await tasks.findById(tasks.params.id)

        updates.forEach((update) => task[update] = req.body[update]);

        await task.save();

        if(!task){
            return res.status(404).send()
        }

        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', async (req,res) => {
    try{
        const task = tasks.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }
    catch(e){
        res.status(500).send()
    }
})

module.exports = router