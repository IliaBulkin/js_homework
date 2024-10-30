import express, { Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

const { cache } = require('ejs');
// const express = require('express');
const app = express()
// const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'templates'))

app.use(cookieParser())
app.use('/static/', express.static(path.join(__dirname, 'static')))

function getCurrentDate() {
    return new Date().toLocaleString(); 
}

app.use(express.json())

app.use('/post/', require('./PostApp/postRouter'))
app.use('', require('./UserApp/userRouter'))

app.get('/', (req: Request, res: Response) => {
    const context = {
        title: 'aboba'
    }
    res.render('index', context)
})

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});