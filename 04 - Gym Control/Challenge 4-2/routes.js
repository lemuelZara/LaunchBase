const express = require('express')

const routes = express.Router()

routes.get('/', function (req, res) {
    return res.render('teacher/index')
})

module.exports = routes