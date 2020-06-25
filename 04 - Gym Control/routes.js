const express = require('express')
const instructors = require('./instructors')

const routes = express.Router()

/**
 * HTTP Verbs
 * 
 * GET: Receber
 * POST: Criar ou Salvar
 * PUT: Atualizar
 * DELETE: Deletar
 */

routes.get('/', function (request, response) {
    return response.redirect('instructors')
})

routes.get('/instructors', function (request, response) {
    return response.render('instructors/index')
})

routes.get('/instructors/create', function (request, response) {
    return response.render('instructors/create')
})

routes.get('/instructors/:id', instructors.show)

routes.get('/instructors/:id/edit', instructors.edit)

routes.post('/instructors', instructors.post)

routes.put('/instructors', instructors.put)

routes.delete('/instructors', instructors.delete)

module.exports = routes