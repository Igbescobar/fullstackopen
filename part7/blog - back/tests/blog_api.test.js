const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./testHelper.test')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/users')

beforeEach(async () => {
    await Blog.deleteMany({});

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
    const savePromises = blogObjects.map(blogObject => blogObject.save());

    await Promise.all(savePromises);
});


test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are 5 blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(5)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')


    expect(response.body).toHaveLength(helper.initialBlogs.length)
})


test('a specific blog is within the returned blogs', async () => {

    const response = await api.get('/api/blogs')


    const title = response.body.map(r => r.title)
    expect(title).toContain(
        'React patterns'
    )
})

test('verifies the existence of an id property', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    console.log(resultBlog.body + blogToView)
    expect(resultBlog.body).toEqual(blogToView)
})

test('verifies the creation of a new blog', async () => {
    const blogsAtStart = (await helper.blogsInDb()).length

    const response = await api.post('/api/post')
})


describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
})

test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
})

afterAll(async () => {
    await mongoose.connection.close()
})