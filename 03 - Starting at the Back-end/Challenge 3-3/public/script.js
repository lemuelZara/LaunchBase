const modal = document.querySelector('.modal')
const cards = document.querySelectorAll('.card')

for (let card of cards) {
    console.log(card)
    card.querySelector('.open').addEventListener('click', function () {
        const id = card.getAttribute('id')

        // Endereço que o usuário irá quando clicar no Card
        window.location.href = `/courses/${id}`
    })
}