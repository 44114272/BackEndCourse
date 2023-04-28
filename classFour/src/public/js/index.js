const socket = io();
const container = document.getElementById('container')
const form = document.getElementById('formdata')

// Agrega un evento de escucha al formulario para el evento "submit"
form.addEventListener('submit', e => {
  e.preventDefault();
  
  const title = document.getElementById('title').value
  const description = document.getElementById('description').value
  const price = document.getElementById('price').value
  const stock = document.getElementById('stock').value
  const category = document.getElementById('category').value
  const code = document.getElementById('code').value

  // Envía los valores a través de Socket.io
  fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      description,
      price,
      stock,
      category,
      code
    })
  }).then(response => {
    if (response.ok) {
      console.log('Product added successfully');
      socket.emit('addProduct', { element: {
        title,
        description,
        price,
        stock,
        category,
        code
      }});
    } else {
      console.log('Error adding product');
    }
  }).catch(error => {
    console.error('Error adding product', error);
  });
  
})

socket.on('showProducts', data => {
    container.innerHTML = ``

    data.forEach(prod => {
        container.innerHTML += `
            <ul>
                <li>title: ${prod.title}</li> 
                <li>description: ${prod.description}</li>
                <li>code: ${prod.code}</li>
                <li>price: ${prod.price}</li>
                <li>status: ${prod.status}</li>
                <li>stock: ${prod.stock}</li>
                <li>category: ${prod.category}</li>
                <li>id: ${prod.id}</li>
            </ul>
        `
    })
})