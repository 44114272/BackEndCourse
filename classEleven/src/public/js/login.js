const formLogin = document.getElementById("formLogin");

formLogin.addEventListener('submit', async e => {
    e.preventDefault()
    const datos = {
        email: formLogin[0].value,
        password: formLogin[1].value
    }

    const respuesta = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(datos)
    });

    if (respuesta.status === 200)
        return console.log(document.cookie);
    
    else {
        location.href = '/login.html'
    }
})