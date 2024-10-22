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

function getAllPosts(max: number) {
    const context = {
        post: post_for_page
    }
    if (max <= post_for_page.length) {
        context.post = post_for_page.slice(0, max)
    }
    return context
}

function getPostById(id: number) {
    const context = {
        post: post_for_page[id-1]
    }

    return {
        context: context,
        length: post_for_page.length
    }
}

let posts3 = [ {name: 'post1', author: 'Author1 '}, 
    {name: 'post2', author: 'Author2'}, 
    {name: 'post3', author: 'Author3'}, 
    {name: 'post4', author: 'Author4'}]

function createPost(data: any) {
    posts3.push(data)
}

export = {
    getAllPosts: getAllPosts,
    getPostById: getPostById,
    createPost: createPost
}