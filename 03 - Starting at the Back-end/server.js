const express = require('express')
const nunjucks = require('nunjucks')
const videos = require('./data')

const server = express()

server.set('view engine', 'njk')
server.use(express.static('public'))

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
})

// Request  = Requisição
// Response = Resposta
server.get('/', function (request, response) {
    const data = {
        avatar_url: 'https://avatars0.githubusercontent.com/u/55895642?s=460&u=23d04221f1435a5fcd494b20ebdeca20ce24b46a&v=4',
        name: 'Lemuel Coelho Zara',
        role: 'Graduando em ADS',
        description: 'Um cara curioso em conhecer novas <a href="#">tecnologias!',
        links: [
            { name: 'GitHub', url: '' },
            { name: 'Facebook', url: '' },
            { name: 'LinkedIn', url: '' },
        ]
    }
    return response.render('about', {
        data
    })
})

server.get('/portfolio', function (request, response) {
    return response.render('portfolio', {
        items: videos
    })
})

server.get('/video', function (request, response) {
    const id = request.query.id

    const video = videos.find(video => video.id === id)

    return video
        ? response.render('video', { items: video })
        : response.send('Video not found')
})


server.listen(5000, function () {
    console.log('Server is running...')
})