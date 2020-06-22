const express = require('express')

const routes = express.Router()

routes.get('/', function (request, response) {
    return response.render('instructors/index')
})

routes.get('/instructors', function (request, response) {
    return response.render('layout')
})

routes.get('/', function (request, response) {
    return response.send('layout')
})

routes.get('/', function (request, response) {
    return response.render('layout')
})

module.exports = routes