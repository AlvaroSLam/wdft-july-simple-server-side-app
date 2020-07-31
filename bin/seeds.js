require('../config/database.config')
const mongoose = require('mongoose')

const TodoModel = require('../models/Todo.model')


TodoModel.insertMany([
    {name: 'Evening routine',description: 'Take the dog for a walk'}, 
    {name: 'Labs',description: 'Complete todays labs'}
])
    .then(() => {
        mongoose.connection.close()
            .then(() => {
                console.log('Heyy connection is closed!')
            })
    })
