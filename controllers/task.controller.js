
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
                userId: req.user.id
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
            res.send({message: 'Tarea eliminada exitosamente'})
        }
        else{
            res.status(404).send({message: 'Tarea no encontrada'})
        }
    })
    .catch(err=>{res.status(404).send({message:err.message})})
})

router.post('/', async (req, res) => {
    const tasks = db.Tasklists
    let newTask = {
        description: req.body.description,
        priorityType :req.body.priority,
        status: req.body.status,
        order: req.body.order,
        userId: req.user.id
    }
    tasks.create(newTask)
    .then(data => {
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({message: 'Ocurrió un error, por favor intente nuevamente'})
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
