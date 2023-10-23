const commentRouter = require('express').Router()
const Comment = require('../models/comment');
const Blog = require('../models/blog')

commentRouter.get("/:id/comments", async (request, response) => {
    const comments = await Comment.find({ blog: request.params.id });
    console.log(comments)
    response.json(comments);
});

commentRouter.post("/:id/comments", async (request, response) => {
    try {
        const body = request.body;
        console.log('body:', body)
        const blog = await Blog.findById(request.params.id)
        console.log('blog:', blog)

        const comment = new Comment({
            content: body.content,
            blog: blog._id,
        });
        console.log('comment', comment)

        const savedComment = await comment.save();
        console.log('savedcomment:', savedComment)

        response.status(201).json(savedComment);
    } catch (error) {
        response.status(500).json({ error: 'An error occurred while adding a comment' });
    }
});

module.exports = commentRouter;