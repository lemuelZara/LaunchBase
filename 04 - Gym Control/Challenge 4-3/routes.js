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
routes.post('/teacher', teacher.post)

module.exports = routes