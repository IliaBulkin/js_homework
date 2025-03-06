import express, { Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import postRouter from './PostApp/postRouter';
import userRouter from './UserApp/userRouter';
import postRouterApi from './PostApp/postRouterApi';
import commentRouterApi from './CommentApp/commentRouterApi';
import cors from 'cors'
import dotenv from 'dotenv'
// ??
const { cache } = require('ejs');
// const express = require('express');
const app = express()
// const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'templates'))

app.use(cookieParser())
app.use('/static/', express.static(path.join(__dirname, 'static')))
// уже не надо
function getCurrentDate() {
    return new Date().toLocaleString(); 
}

app.use(express.json())

app.use(cors({
    origin: ['http://localhost:8000']
}));
// в самый верх перенеси сразу после импортов
dotenv.config()

app.use('/api/post/', postRouterApi)
app.use('/api/comment/', commentRouterApi)

app.use('/post/', postRouter);
app.use('', userRouter);

app.get('/', (req: Request, res: Response) => {
    const context = {
        title: 'aboba'
    }
    res.render('index', context)
})
// тоже вверх 
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});