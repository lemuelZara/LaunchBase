const express = require('express')
const instructors = require('./instructors')

const routes = express.Router()

routes.get('/', function (request, response) {
    return response.redirect('instructors/index')
})

routes.get('/instructors', function (request, response) {
    return response.render('instructors/index')
})

routes.get('/instructors/create', function (request, response) {
    return response.render('instructors/create')
})

routes.post('/instructors', instructors.post)

module.exports = routes