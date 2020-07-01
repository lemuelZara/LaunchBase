const currentPage = window.location.pathname
const menuItems = document.querySelectorAll('header .nav_links a')

for (let item of menuItems) {
    if (currentPage.includes(item.getAttribute('href'))) {
        item.classList.add('active')
    }
    console.log(item)
}