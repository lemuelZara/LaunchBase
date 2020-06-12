// Construção e impressão de objetos
const empresa = {
    nome: 'Rocketseat',
    cor: 'Roxo',
    foco: 'Programação',
    endereco: {
        rua: 'Rua Guilherme Gembala',
        num: 260
    }
}

console.log(`A Empresa ${empresa.nome} está localizada em ${empresa.endereco.rua}, ${empresa.endereco.num}`)

// Vetores e objetos
const programador = {
    nome: 'Pedro',
    idade: 20,
    tecnologias: [
        { nome: 'C++', especialidade: 'Desktop' },
        { nome: 'Python', especialidade: 'Data Science' },
        { nome: 'JavaScript', especialidade: 'Web/Mobile' },
    ]
}

console.log(`O usuário ${programador.nome} tem ${programador.idade} anos e usa a tecnologia ${programador.tecnologias[0].nome} com especialidade em ${programador.tecnologias[0].especialidade}`)