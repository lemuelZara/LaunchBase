const fs = require('fs')
const data = require('./data.json')

exports.post = function (request, response) {
    const keys = Object.keys(request.body)

    // Realizando a validação para nenhum campo estar vazio
    for (let key of keys) {
        if (request.body[key] === '') {
            return response.send('Por favor, preencha todos os campos!')
        }
    }

    let { avatar_url, name, birth, schooling, type_class, occupation } = request.body

    birth = Date.parse(birth)

    const id = data.teachers.length + 1
    const created_at = Date.now()

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        schooling,
        type_class,
        occupation,
        created_at
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
        if (err) return response.send('Opa! Aconteceu algum erro!')

        return response.redirect('/teacher')
    })
}