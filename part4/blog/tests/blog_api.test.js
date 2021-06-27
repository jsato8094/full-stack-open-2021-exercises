const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of helper.initialBlogs) {
    let obj = new Blog(blog)
    await obj.save()
  }
})

describe('GET /api/blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('property `id` is defined', async () => {
    const response = await api.get('/api/blogs')
    for(let json of response.body) {
      expect(json.id).toBeDefined()
    }
  })
})

describe('POST /api/blogs', () => {
  test('new blog is created', async () => {
    const newBlog = {
      title: "This is new blog",
      author: "someone",
      url: "http://example.com",
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
  
    const titles = blogs.map(b => b.title)
    expect(titles).toContain(newBlog.title)
  })

  test('if "likes" is missing, it will zero', async () => {
    const newBlogWithoutLikes = {
      title: "This is new blog",
      author: "someone",
      url: "http://example.com"
    }

    const response = await api.post('/api/blogs').send(newBlogWithoutLikes)
    expect(response.body.likes).toBe(0)
  })
})

afterAll(() => {
  mongoose.connection.close()
})