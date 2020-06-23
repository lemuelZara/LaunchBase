const fs = require('fs')
const data = require('./data.json')

exports.post = function (request, response) {
    const keys = Object.keys(request.body)

    for (let key of keys) {
        if (request.body[key] === '') {
            return response.send('Por favor, preencha todos os campos!')
        }
    }

    let { avatar_url, name, birth, gender, services } = request.body
    
    birth = Date.parse(birth)

    const id = Number(data.instructors.length + 1)
    const created_at = Date.now()

    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function(err) {
        if (err) return response.send('Write file error!')

        return response.redirect('/instructors')
    })
}