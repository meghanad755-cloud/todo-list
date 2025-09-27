const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    message:{
        type:String,
        minLength:4,
        maxLength:20,
    }
})

const TodoModel = mongoose.model('todo',todoSchema)
module.exports = TodoModel;