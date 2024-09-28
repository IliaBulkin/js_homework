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
        title: 'aboba'
     }
    res.render('index', context)
})

app.get('/date/', (req, res) => {
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

app.get('/comments/', (req, res) => {
    const context = {
        comments: [{title: 'title1', message: 'aboba1', author: 'author1', authorImg: '/static/authorImg1.jpg'}, 
                    {title: 'title2', message: 'aboba2', author: 'author2', authorImg: '/static/authorImg1.jpg'},
                    {title: 'title3', message: 'aboba3', author: 'author3', authorImg: '/static/authorImg1.jpg'},]
    }
    res.render('comments', context)
})

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});