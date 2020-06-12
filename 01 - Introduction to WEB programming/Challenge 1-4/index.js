// Operações Bancárias
const user = {
    name: 'Mariana',
    transactions: [],
    balance: 0
}

// Adicionar transações
function createTransaction(transaction) {
    if (transaction.type === 'credit') {
        user.balance += transaction.value
    }
    if (transaction.type === 'debit') {
        user.balance -= transaction.value
    }

    user.transactions.push(transaction)
}

// Relatórios
function getHigherTransactionByType(typeTransaction) {
    let maior = 0
    let higherTransaction = {}

    for (const iterator of user.transactions) {
        if (iterator.type === typeTransaction) {
            if (iterator.value >= maior) {
                maior = iterator.value

                higherTransaction = iterator
            }
        }
    }

    return higherTransaction
}

function getAverageTransactionValue() {
    const totalValueTransactions = user.transactions.reduce((total, transactionValue) => {
        return total + transactionValue.value
    }, 0)

    return totalValueTransactions / user.transactions.length
}

function getTransactionsCount() {
    let credit = 0
    let debit = 0

    for (const iterator of user.transactions) {
        iterator.type === 'credit' ? credit++ : debit++
    }

    return { credit, debit }
}

createTransaction({ type: 'credit', value: 50 })
createTransaction({ type: 'credit', value: 120 })
createTransaction({ type: 'debit', value: 80 })
createTransaction({ type: 'debit', value: 30 })

console.log(user.balance)

console.log(getHigherTransactionByType('credit'))
console.log(getHigherTransactionByType('debit'))

console.log(getAverageTransactionValue())

console.log(getTransactionsCount())