const mongoose = require('mongoose')

let TodoSchema = new mongoose.Schema({
    name: String,
    description: String
})


module.exports =  mongoose.model('myTodo', TodoSchema)