const modalOverlay = document.querySelector('.modal-overlay')
const modal = document.querySelector('.modal')
const cards = document.querySelectorAll('.card')

console.log(cards)

for (let card of cards) {
    console.log(card)
    card.querySelector('.open').addEventListener('click', function () {
        const id = card.getAttribute('id')

        modalOverlay.classList.add('active')
        modalOverlay.querySelector('iframe').src = `https://rocketseat.com.br/${id}`
    })
}

document.querySelector('.close-modal').addEventListener('click', function () {
    modalOverlay.classList.remove('active')
    modalOverlay.querySelector('iframe').src = ''
})

document.querySelector('.maximize-modal').addEventListener('click', function () {
    if (modal.classList.contains('maximize')) {
        modal.classList.remove('maximize')
    } else {
        modal.classList.add('maximize')
    }
})