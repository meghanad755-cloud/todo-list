const express = require('express')
const { getAllToDo, createToDo, updateToDo, deleteToDo } = require('../controllers/todoCtrl')
const todoRouter = express.Router()

//get-> read
//post->send /create
//put-> update
//delete-> delete

todoRouter.get('/getall',getAllToDo)
todoRouter.post('/', createToDo)
todoRouter.put('/updateToDo/:id', updateToDo)
todoRouter.delete('/deleteToDo/:id',deleteToDo)

module.exports = todoRouter