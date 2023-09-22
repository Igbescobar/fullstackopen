const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/users')

blogRouter.get('/', async (request, response, next) => {
    const blogs = await Blog.find({})
    if (blogs) {
        response.json(blogs)
    } else {
        response.status(404).end()
    }
})

blogRouter.post('/', async (request, response, next) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    })

    if (body.title === undefined || body.url === undefined) {
        response.status(400).end()
    } else {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    }
})

blogRouter.delete('/:id', async (request, response,) => {
    const id = request.params.id

    await Blog.findByIdAndDelete(id)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const id = request.params.id

    const { title, author, url, likes } = request.body

    const updatedBlog = await Blog.findByIdAndUpdate(id,
        { title, author, url, likes },
        { new: true, context: 'query' })
    response.status(204).json(updatedBlog)
})
module.exports = blogRouter