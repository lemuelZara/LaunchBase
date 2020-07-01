module.exports = {
    age: function (timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()

        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
            age = age - 1
        }

        return age
    },

    date: function (timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth()}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        }
    },

    schooling: function (graduation) {
        if (graduation === 'ens_medio') {
            return 'Ensino Médio Completo'
        } else if (graduation === 'ens_superior') {
            return 'Ensino Superior Completo'
        } else if (graduation === 'mestrado') {
            return 'Mestrado'
        } else {
            return 'Doutorado'
        }
    },

    grade: function (year_school) {
        if (year_school === '6EF') {
            return '6º ano do Ensino Fundamental (5ª Série)'
        } else if (year_school === '7EF') {
            return '7º ano do Ensino Fundamental (6ª Série)'
        } else if (year_school === '8EF') {
            return '8º ano do Ensino Fundamental (7ª Série)'
        } else if (year_school === '9EF') {
            return '9º ano do Ensino Fundamental (8ª Série)'
        } else if (year_school === '1EM') {
            return '1ª ano do Ensino Médio'
        } else if (year_school === '2EM') {
            return '2ª ano do Ensino Médio'
        } else {
            return '3ª ano do Ensino Médio'
        }
    }
}