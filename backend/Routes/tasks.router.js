
const express = require('express');

const TaskService = require('./../Services/task.service');

const router = express.Router();
const service = new TaskService();

//get all the tasks
router.get('/', async(req, res, next)=>{
    try {
        const tasks = await service.find();
        res.json(tasks);
    } catch (error) {
        next(error);
    }
});
// get one task
router.get('/:id', async(req, res, next)=>{
    try {
        const {id} = req.params;
        const task = await service.findOne(id);
        res.json(task);
    } catch (error) {
        res.status(404).send('this task is not in the database');
        next(error);
    }
});
// create new task
router.post('/', async (req, res, next)=>{
    try {
        const {title, description, date, isCompleted} = req.body;
        const body = [title, description, date, isCompleted];
        const newTask = await service.create(body);
        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
});
// update a task
router.patch('/:id', async (req, res, next)=>{
    try {
        const {id} = req.params;
        const {title, description, date, isCompleted} = req.body;
        const changes = [title, description, date, isCompleted, id];
        const task = await service.update(changes);
        res.json(task);
    } catch (error) {
        next(error);   
    }
});

router.delete('/:id', async (req, res, next)=>{
    try {
        const {id} = req.params;
        await service.delete(id);
        res.status(201).json({id});
    } catch (error) {
        next(error);
    }
});

module.exports = router;




