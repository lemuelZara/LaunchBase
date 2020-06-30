const express = require('express')
const teacher = require('./teacher')

const routes = express.Router()

routes.get('/', function (req, res) {
    return res.redirect('teacher')
})

routes.get('/teacher', function (request, response) {
    return response.render('teacher/index')
})

routes.get('/teacher/register', function (request, response) {
    return response.render('teacher/register')
})

routes.get('/teacher/:id', teacher.show)
routes.get('/teacher/:id/edit', teacher.edit)

routes.post('/teacher', teacher.post)

routes.put('/teacher', teacher.put)

routes.delete('/teacher', teacher.delete)


module.exports = routes