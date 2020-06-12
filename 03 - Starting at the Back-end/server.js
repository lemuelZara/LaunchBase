const express = require('express')
const nunjucks = require('nunjucks')

const server = express()

server.set('view engine', 'njk')
server.use(express.static('public'))

nunjucks.configure('views', {
    express: server
})

// Request  = Requisição
// Response = Resposta
server.get('/', function(request, response) {
    return response.render('about')
})
server.get('/portfolio', function(request, response) {
    return response.render('portfolio')
})


server.listen(5000, function() {
    console.log('Server is running...')
})