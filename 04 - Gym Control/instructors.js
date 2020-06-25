const fs = require('fs')
const data = require('./data.json')
const { age, date } = require('./utils')

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

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
        if (err) return response.send('Write file error!')

        return response.redirect('/instructors')
    })
}

exports.show = function (request, response) {
    const { id } = request.params

    const foundInstructor = data.instructors.find(instructor => {
        return instructor.id == id
    })

    if (!foundInstructor) {
        return response.send('Instructor not found!')
    }

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(','),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at)
    }

    return response.render('instructors/show', {
        instructor
    })
}

exports.edit = function (request, response) {
    const { id } = request.params

    const foundInstructor = data.instructors.find(instructor => {
        return instructor.id == id
    })

    if (!foundInstructor) {
        return response.send('Instructor not found!')
    }

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth)
    }

    return response.render('instructors/edit', {
        instructor
    })
}

exports.put = function (request, response) {
    let index = 0

    const { id } = request.body

    const foundInstructor = data.instructors.find((instructor, foundIndex) => {
        if (instructor.id == id) {
            index = foundIndex

            return true
        }
    })

    if (!foundInstructor) {
        return response.send('Instructor not found!')
    }

    const instructor = {
        ...foundInstructor,
        ...request.body,
        birth: Date.parse(request.body.birth)
    }

    data.instructors[index] = instructor

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
        if (err) {
            return response.send('Write file error!')
        }

        return response.redirect(`/instructors/${id}`)
    })
}

exports.delete = function (request, response) {
    const { id } = request.body

    const filteredInstructors = data.instructors.filter(instructor => {
        return instructor.id != id
    })

    data.instructors = filteredInstructors

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
        if (err) {
            return response.send('Write file error!')
        }

        return response.redirect('/instructors')
    })
}