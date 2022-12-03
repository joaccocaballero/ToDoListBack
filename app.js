const express = require('express');
const cors = require('cors')
const port = 8080
const app = express();


const taskRoutes = require('./controllers/task.controller');
const middlewares = require('./middlewares/mid.js');

const logUser = require('./controllers/user.controller.js');
const {verify} = require('jsonwebtoken');
const {verifyToken} = require('./middlewares/validate-jwt');

app.use(cors())
app.use(express.json())
app.use(middlewares);
app.use('/tasks',verifyToken,taskRoutes)
app.use('/',logUser)


app.listen(port, () => {
    console.log(`Services are running in port ${port}...`)
})