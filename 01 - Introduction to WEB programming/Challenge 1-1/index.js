// Cálculo de IMC
const pessoa1 = {
    nome: 'Carlos',
    peso: 84,
    altura: 1.88,
    sexo: 'M'
}

const imc = pessoa1.peso / (pessoa1.altura ** 2)

if (imc >= 30) {
    console.log('Carlos você está acima do peso')
} else {
    console.log('Carlos você não está acima do peso')
}

// Cálculo de Aposentadoria
const pessoa2 = {
    nome: 'Silvio',
    sexo: 'M',
    idade: 61,
    contribuicao: 34
}

const tempContribuicaoHomem =
    pessoa2.contribuicao >= 35 && (pessoa2.idade + pessoa2.contribuicao) >= 95

const tempContribuicaoMulher =
    pessoa2.contribuicao >= 30 && (pessoa2.idade + pessoa2.contribuicao) >= 85

if ((pessoa2.sexo === 'F' && tempContribuicaoMulher)
    ||
    (pessoa2.sexo === 'M' && tempContribuicaoHomem)) {
    console.log(`${pessoa2.nome}, você pode se aposentar!`)
} else {
    console.log(`${pessoa2.nome}, você ainda não pode se aposentar!`)
}