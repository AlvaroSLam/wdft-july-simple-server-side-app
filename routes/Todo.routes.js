const express = require('express')

const router = express.Router()

//DEFINIMOS AQUI LOS ROUTES Y LOS TENEMOS LUEGO QUE PONER 

/*
router.get('/', (req, res) => {//Instead of app.get usaremos router.get ya lo hemos especificado en la linea 3.
    res.render('landing') //Ponemos landing porque en nuestro express ya lo tenemos especificado gracias al middleware
})
*/

//Le decimos que cuando pulsemos el '/' nos lleve a la página web

const TodoModel = require('../models/Todo.model')

router.get('/', (req, res) => {
    res.render('landing')
})

//This print me all the names of the database en el all todos
router.get('/all-todos', (req, res) => {
    TodoModel.find()
        .then((todos) => {
            console.log(todos)
            res.render('all-todo.hbs', {todos})
        })
})

router.get('/create', (req, res) => {
    res.render('create-todo')
})

router.post('/create', (req, res) => {//Aqui llega lo que nos llega del submit, aunque si no hacemos lo de abajo no guardará nada
    TodoModel.create(req.body) //Es el object { name: 'AlvaroSLam', description: 'Sanchez' } req.body guarda ese object. Es the client request
        .then(() => {
            res.render('create-todo.hbs', {successTodo: true})
         })
})

router.get('/todo/:id', (req, res) => {
    TodoModel.findById(req.params.id)
        .then((result) => {
            res.render('todo.hbs', {result})
        })
        .catch((err) => {
            console.log('ERROR!!!!', err)
        })
    // res.render('create-todo.hbs')
})

router.get('/todo/:id/delete', (req, res) => {
    console.log(req.params.id)
    TodoModel.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/all-todos') //Lo redirigimos al antiguo all todos
        })
})

router.get('/todo/:id/edit', (req, res) => {
    TodoModel.findById(req.params.id)
        .then((todo) => {
            res.render('edit-todo.hbs', {todo})
        })
})


router.post('/todo/:id/edit', (req, res) => {
    let {name, description} = req.body
    let todoId = req.params.id
    TodoModel.findByIdAndUpdate(todoId, {$set: {name, description}})
        .then(() => {
            res.redirect('/all-todos')
        })
})

module.exports = router


