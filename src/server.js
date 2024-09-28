const { cache } = require('ejs');
const express = require('express');
const app = express()
const path = require('path')


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'templates'))


app.use('/static/', express.static(path.join(__dirname, 'static')))

function getCurrentDate() {
    return new Date().toLocaleString(); 
}

app.get('/', (req, res) => {
    // res.sendFile(path.resolve(__dirname, "./templates/index.ejs"))
    const context = {
        title: 'aboba2'
     }
    res.render('index', context)
})

app.get('/date', (req, res) => {
    const currentDate = getCurrentDate();
    console.log(currentDate); 
    res.send(`${currentDate}`); 
});


app.get('/posts', (req, res) => {
    const context = {
        posts: [ {name: 'post1', author: 'Author1 '}, 
                {name: 'post2', author: 'Author2'}, 
                {name: 'post3', author: 'Author3'}, 
                {name: 'post4', author: 'Author4'}]
    }
    res.render('posts', context)
})

app.get('/user/', (req, res) => {
    res.render('user', cache)
})

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});