const express = require('express')
const teacher = require('./controllers/teacher')
const student = require('./controllers/student')

const routes = express.Router()

routes.get('/', function (req, res) {
    return res.redirect('teacher')
})

// Teacher
routes.get('/teacher', teacher.index)
routes.get('/teacher/register', function (request, response) {
    return response.render('teacher/register')
})
routes.get('/teacher/:id', teacher.show)
routes.get('/teacher/:id/edit', teacher.edit)
routes.post('/teacher', teacher.post)
routes.put('/teacher', teacher.put)
routes.delete('/teacher', teacher.delete)

// Student
routes.get('/student', student.index)
routes.get('/student/register', student.register)
routes.get('/student/:id', student.show)
routes.get('/student/:id/edit', student.edit)
routes.post('/student', student.post)
routes.put('/student', student.put)
routes.delete('/student', student.delete)

module.exports = routes