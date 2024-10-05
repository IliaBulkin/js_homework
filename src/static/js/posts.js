const button = document.querySelector('#button')

button.addEventListener('click', () => {
    fetch('/post/create', {
        method: 'POST',
        body: JSON.stringify({
            name: 'new name',
            description: 'new description',
            date: 'new date',
            author: 'new author'
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
})