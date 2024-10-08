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

function getAllPosts(max) {
    const context = {
        post: post_for_page
    }
    if (max <= post_for_page.length) {
        context.post_for_page = post_for_page.slice(0, max)
    }
    return context
}

function getPostById(id) {
    const context = {
        post: post_for_page[id-1]
    }

    return {
        context: context,
        length: post_for_page.length
    }
}

function createPost(data) {
    posts3.push(data)
}

module.exports = {
    getAllPosts: getAllPosts,
    getPostById: getPostById,
    createPost: createPost
}