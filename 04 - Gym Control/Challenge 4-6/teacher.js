const fs = require('fs')
const data = require('./data.json')
const { age, schooling, date } = require('./utils')

exports.index = function (request, response) {
    return response.render('teacher/index', {
        teachers: data.teachers
    })
}

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

exports.show = function (request, response) {
    const { id } = request.params

    const foundTeacher = data.teachers.find(teacher => {
        return teacher.id == id
    })

    const teacher = {
        ...foundTeacher,
        birth: age(foundTeacher.birth),
        schooling: schooling(foundTeacher.schooling),
        occupation: foundTeacher.occupation.split(','),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundTeacher.created_at)
    }

    return response.render('teacher/show', { teacher })
}

exports.edit = function (request, response) {
    const { id } = request.params

    const foundTeacher = data.teachers.find(teacher => {
        return teacher.id == id
    })

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth)
    }

    return response.render('teacher/edit', {
        teacher
    })
}

exports.put = function (request, response) {
    let index = 0

    const { id } = request.body

    const foundTeacher = data.teachers.find((teacher, teacherIndex) => {
        if (teacher.id == id) {
            index = teacherIndex

            return true
        }
    })

    if (!foundTeacher) {
        return response.send('Instructor not found!')
    }

    const teacher = {
        ...foundTeacher,
        ...request.body,
        birth: Date.parse(request.body.birth)
    }

    data.teachers[index] = teacher

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
        if (err) {
            return response.send('Write file error!')
        }

        return response.redirect(`/teacher/${id}`)
    })
}

exports.delete = function (request, response) {
    let index = 0

    const { id } = request.body

    const filteredTeacher = data.teachers.filter(teacher => {
        return teacher.id != id
    })

    data.teachers = filteredTeacher

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
        if (err) {
            return response.send('Write file error!')
        }

        return response.redirect('/teacher')
    })
}