
require("dotenv").config()

const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router();
const db = require('../models/index');
const jwt = require('jsonwebtoken')

//Create a new user
router.post('/register', async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)
    const newUser = {
        username: req.body.username,
        password: password
    }
    const users = db.Users
    users.create(newUser)
    .then(data => {
        res.send({message: 'User created successfully'})
    })
    .catch(err => {
        res.status(500).send({message: 'An error occurred, please try again'})
    })
})

//Authenticates a registered user
router.post('/login', async (req, res) => {
    const users = db.Users
    users.findAll({
        where:{
            username: req.body.username
        }
    })
    .then(async data=> {
        if(data){
            const user = data[0].dataValues
            const names = {
                username: data[0].dataValues.username,
            }       
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if (!validPassword) {
                res.status(401).send({message: 'User is not valid'})
            } else {
                const token = jwt.sign({
                    username: user.username,
                    id: user.id
                }, process.env.TOKEN_SECRET, {expiresIn: '1000s'})
                res.send({message: 'Successfully Log In',token,names})
            }  
        }
    })
    .catch(err => {res.status(500).send({message: 'User does not exists'})})
})

//Creates a new Admin User
router.post('/registerAdmin', async(req,res)=>{
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)
    const newAdmin = {
        username: req.body.username,
        password: password
    }
    const admins = db.AdminUser
    admins.create(newAdmin)
        .then(data => {
            res.send({message: 'User created successfully'})
        })
        .catch(err => {
            res.status(500).send({message: 'An error occurred, please try again'})
        })
})

//Authenticates an Administrator
router.post('/loginAdmin', async (req,res)=>{
    const admins = db.AdminUser
    admins.findAll({
        where:{
            username: req.body.username
        }
    })
    .then(async data=>{
        const user = data[0].dataValues
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword){
            res.status(401).send({message: 'User is not valid'})
        }else {
            const token = jwt.sign({
                username: user.username,
                id: user.id
            }, process.env.TOKEN_SECRET, {expiresIn: '1000s'})
            res.send({message: 'Successful Log In', token})
        }
    })
    .catch(err => {res.status(500).send({message: 'User does not exists'})})    
})

//Deletes a user and its respective tasks saved in database
router.delete('/adminManager/deletion/:id',async(req,res)=>{
    let userId = req.params.id
    const users = db.Users
    let tasks = db.Tasklists
    tasks.destroy({
        where: {
            userId: userId
        }
    })

    users.destroy({
        where: {
            id: userId
        }
    })
    .then(data => {
        if (data) {
            res.send({message: 'User deleted successfully'})
        }
        else {
            res.status(404).send({message: 'User not found'})
        }
    })
    .catch(err => {res.status(404).send({message: err.message})})
})

//Return users that are registered to be shown in the Admin Section 
router.get('/adminManager/getUsers', async(req,res)=>{
    const users = db.Users
    users.findAll(
        {
            attributes: ['id','username']
        }
    )
    .then(data => {res.send(data)})
    .catch(err => {res.send({message: err.message})})
})



module.exports = router