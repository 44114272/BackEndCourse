const socket = io();
const container = document.getElementById('product-list');

socket.on('updateProducts', data => {
    container.innerHTML = ``
    data.forEach(prod => {
        container.innerHTML += `
            <p>${prod.title}</p>
            <p>${prod.description}</p>
            <p>${prod.price}</p>
        `
    })
})