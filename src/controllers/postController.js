const postService = require('../services/postService')

function getAllPosts(req, res) {
    const context = postService.getAllPosts()
    res.render('posts', context)
}

function getPostById(req, res) {
    // const context = {
    //     post: post_for_page[req.params.id-1]
    // }
    const id = req.params.id
    const data = postService.getPostById(id)
    if (id <= data.length) {
        res.render('post', data.context)
    } else {
        res.render('error', data.cache)
    }
}

function createPost(req, res) {
    const data = req.body
    postService.createPost(data)
    res.send('doing this shit bro')
}

module.exports = {
    getAllPosts: getAllPosts,
    getPostById: getPostById,
    createPost: createPost
}