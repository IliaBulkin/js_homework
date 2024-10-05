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

app.use(express.json())

app.get('/', (req, res) => {
    // res.sendFile(path.resolve(__dirname, "./templates/index.ejs"))
    const context = {
        title: 'aboba'
     }
    res.render('index', context)
})


app.get('/date/', (req, res) => {
    const currentDate = getCurrentDate();
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
        comments: [{title: 'title1', message: 'aboba1', author: 'author1', authorImg: '/static/img/authorImg1.jpg'}, 
                    {title: 'title2', message: 'aboba2', author: 'author2', authorImg: '/static/img/authorImg1.jpg'},
                    {title: 'title3', message: 'aboba3', author: 'author3', authorImg: '/static/img/authorImg1.jpg'},]
    }
    res.render('comments', context)
})


const post_for_page = [
    {
        "name": "a1",
        "description": "a1 description",
        "date": "a1 date",
        "author": "a1 author"
    },
    {
        "name": "b2",
        "description": "b2 description",
        "date": "b2 date",
        "author": "b2 author"
    },
    {
        "name": "c3",
        "description": "c3 description",
        "date": "c3 date",
        "author": "c3 author"
    },
    {
        "name": "d4",
        "description": "d4 description",
        "date": "d4 date",
        "author": "d4 author"
    },
    {
        "name": "e5",
        "description": "e5 description",
        "date": "e5 date",
        "author": "e5 author"
    }
]


// Через ? задаем текст для поиска, как в браузере
app.get('/postss', (req, res) => {
    const context = {
        post: post_for_page
    }
    console.log(req.query)
    const max = req.query.max
    if (max <= post_for_page.length) {
        context.post_for_page = post_for_page.slice(0, max)
    }
    res.render('postss', context)
})

app.get('/post/:id', (req, res) => {
    // console.log(req.params) // params - параметры(в данном случае id)
    const context = {
        post: post_for_page[req.params.id-1]
    }
    if (req.params.id <= post_for_page.length) {
        res.render('post', context)
    } else {
        // Сережа, я не очень понял формулировку некоторых пунктов заданий
        // Например "поменять направление расположения на вертикальное"
        // И с доп заданием та же история, но вроде новый способ придумал, поэтому считаю этот пункт выполненным
        res.render('error', cache)
    }
    
})


app.post('/post/create', (req, res) => {
    const data = req.body
    console.log(data)
    post_for_page.push(data)
    res.send('doing this shit bro')
})


const PORT = 8000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});