form.addEventListener('submit', (event)=>{
    event.preventDefault()
    fetch('', {
        method: 'POST',
        body: JSON.stringify({
            username: username.value,
            email: email.value,
            password: password.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
})