const fs = require('fs')
const data = require('../data.json')
const { date } = require('../utils')

exports.index = function (request, response) {
    return response.render('members/index', {
        members: data.members
    })
}

exports.post = function (request, response) {
    const keys = Object.keys(request.body)

    for (let key of keys) {
        if (request.body[key] === '') {
            return response.send('Por favor, preencha todos os campos!')
        }
    }

    birth = Date.parse(request.body.birth)

    let id = 1
    const lastMembers = data.members[data.members.length - 1]

    if (lastMembers) {
        id = lastMembers.id + 1
    }

    data.members.push({
        id,
        ...request.body,
        birth
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
        if (err) return response.send('Write file error!')

        return response.redirect(`/members/${id}`)
    })
}

exports.show = function (request, response) {
    const { id } = request.params

    const foundMember = data.members.find(member => {
        return member.id == id
    })

    if (!foundMember) {
        return response.send('Member not found!')
    }

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birthDay
    }

    return response.render('members/show', {
        member
    })
}

exports.edit = function (request, response) {
    const { id } = request.params

    const foundMember = data.members.find(member => {
        return member.id == id
    })

    if (!foundMember) {
        return response.send('Member not found!')
    }

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).iso
    }

    return response.render('members/edit', {
        member
    })
}

exports.put = function (request, response) {
    let index = 0

    const { id } = request.body

    const foundMember = data.members.find((member, foundMemberIndex) => {
        if (member.id == id) {
            index = foundMemberIndex

            return true
        }
    })

    if (!foundMember) {
        return response.send('Member not found!')
    }

    const member = {
        ...foundMember,
        ...request.body,
        id: Number(id),
        birth: Date.parse(request.body.birth)
    }

    data.members[index] = member

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
        if (err) {
            return response.send('Write file error!')
        }

        return response.redirect(`/members/${id}`)
    })
}

exports.delete = function (request, response) {
    const { id } = request.body

    const filteredmembers = data.members.filter(instructor => {
        return instructor.id != id
    })

    data.members = filteredmembers

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
        if (err) {
            return response.send('Write file error!')
        }

        return response.redirect('/members')
    })
}

exports.create = function (request, response) {
    return response.render('members/create')
}