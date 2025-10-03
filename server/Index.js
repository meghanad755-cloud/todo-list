require('dotenv').config()
const express = require('express')
const RunServer = require("./database/Connection");
const cors = require('cors');
const todoRouter = require('./routes/TodoRoutes');

const app = express()
const PORT = process.env.PORT;

app.use(express.json())
app.use(cors())


RunServer()

app.use('/todolist',todoRouter)

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT} port`)
})