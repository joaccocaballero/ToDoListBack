
require('dotenv').config()
const express = require('express');
const {DataTypes, Sequelize} = require('sequelize');
const router = express.Router();
const db = require('../models/index');
const jwt = require('jsonwebtoken')

router.get('/', async (req, res) => {
    const idN = req.params.id 
    const tasks = db.Tasklists
    const token = req.header('Authorization')
    tasks.findAll(
        {
            where:{
                userId: jwt.verify(token, process.env.TOKEN_SECRET).id
            }
        }
    )
    .then(data=>{res.send(data)})
    .catch(err => {res.status(500).send({message:err.message})})
})

router.delete('/:id', async (req,res)  => {
    let idN = req.params.id
    let tasks = db.Tasklists
    tasks.destroy({
        where: {
            id: idN
        }
    })
    .then(data => {
        if (data >= 1){
            res.send({message: 'Task deleted succesfully!'})
        }
        else{
            res.status(404).send({message: 'Task was not found!'})
        }
    })
    .catch(err=>{res.status(404).send({message:err.message})})
})

router.post('/', async (req, res) => {
    const tasks = db.Tasklists
    const token = req.header('Authorization')
    let newTask = {
        description: req.body.description,
        priorityType :req.body.priority,
        status: req.body.status,
        order: req.body.order,
        userId: jwt.verify(token, process.env.TOKEN_SECRET).id
    }
    tasks.create(newTask)
    .then(data => {
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({message: 'An error occured, please try again!'})
    })
})

router.patch('/:id', async (req,res)=>{
    let idN = req.params.id
    const tasks = db.Tasklists
    tasks.update(
        {status: Sequelize.literal('NOT status')},
        {where: {id: idN}}
    )
    .then(data=>{
        res.status(200).send({message: 'status edited succesfully'})
    })
    .catch(err => {
        res.send({message: err.message})
    })
    
})

module.exports = router
