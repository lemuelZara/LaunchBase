const express = require('express')
const nunjucks = require('nunjucks')
const courses = require('./data')

const server = express()

server.set('view engine', 'njk')

server.use(express.static('public'))

nunjucks.configure('views', {
    express: server
})

server.get('/', function (req, res) {
    res.render('courses', { courses })
})

server.get('/about', function (req, res) {
    const data = {
        avatar_url: 'https://avatars0.githubusercontent.com/u/28929274?s=200&v=4',
        name: 'Rocketseat',
        description: 'Mais do que uma plataforma de educação em tecnologia, uma comunidade incrível de programadores em busca do próximo nível 🚀',
        techs: [
            { name: 'ReactJS' },
            { name: 'Node.js' },
            { name: 'React Native' },
        ],
        socialLinks: [
            { name: 'GitHub', url: '' },
            { name: 'Instagram', url: '' },
            { name: 'Facebook', url: '' },
        ]
    }

    res.render('about', {
        data
    })
})

server.get('/courses/:id', function (req, res) {
    const id = req.params.id

    const dataCourse = courses.find(course => course.name === id)

    return res.render('course', { dataCourse })
})

server.use(function (req, res) {
    res.status(404).render('not-found')
})

server.listen(3333, function () {
    console.log('Server is running...')
})