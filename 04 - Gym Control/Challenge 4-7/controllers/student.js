const fs = require('fs')
const data = require('../data.json')
const { age, grade, date } = require('../utils')

exports.register = function (request, response) {
    return response.render('student/register')
}

exports.index = function (request, response) {
    return response.render('student/index', {
        students: data.students
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

    let id = 1
    const lastStudent = data.students[data.students.length - 1]

    if (lastStudent) {
        id = lastStudent.id + 1
    }

    data.students.push({
        id,
        ...request.body,
        birth: Date.parse(request.body.birth)
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
        if (err) return response.send('Opa! Aconteceu algum erro!')

        return response.redirect(`/student/${id}`)
    })
}

exports.show = function (request, response) {
    const { id } = request.params

    const foundStudent = data.students.find(student => {
        return student.id == id
    })

    if (!foundStudent) {
        return response.send('Student not found!')
    }

    const student = {
        ...foundStudent,
        birth: age(foundStudent.birth),
        year_school: grade(foundStudent.year_school)
    }

    return response.render('student/show', { student })
}

exports.edit = function (request, response) {
    const { id } = request.params

    const foundStudent = data.students.find(students => {
        return students.id == id
    })

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso
    }

    return response.render('student/edit', {
        student
    })
}

exports.put = function (request, response) {
    let index = 0

    const { id } = request.body

    const foundStudent = data.students.find((students, studentsIndex) => {
        if (students.id == id) {
            index = studentsIndex

            return true
        }
    })

    if (!foundStudent) {
        return response.send('Student not found!')
    }

    const students = {
        ...foundStudent,
        ...request.body,
        birth: Date.parse(request.body.birth)
    }

    data.students[index] = students

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
        if (err) {
            return response.send('Write file error!')
        }

        return response.redirect(`/student/${id}`)
    })
}

exports.delete = function (request, response) {
    const { id } = request.body

    const filteredStudents = data.students.filter(students => {
        return students.id != id
    })

    data.students = filteredStudents

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
        if (err) {
            return response.send('Write file error!')
        }

        return response.redirect('/student')
    })
}