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

        return `${year}-${month}-${day}`
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
    }
}