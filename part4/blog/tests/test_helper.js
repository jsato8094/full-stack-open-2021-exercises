const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  }
]

const initialUsers = [
  {
    name: "Michael Chan",
    username: "michael",
    password: "passpass"
  },
  {
    name: "Edsger W. Dijkstra",
    username: "edsger",
    password: "wordword"
  },
]

const initiateDb = async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  for (let user of initialUsers) {
    const passwordHash = await bcrypt.hash(user.password, 10)
    const userToBeSaved = new User({
      username: user.username,
      name: user.name,
      passwordHash,
    })
    await userToBeSaved.save()
  }

  for (let blog of initialBlogs) {
    const users = await User.find({})
    const user = users.filter(u => u.name === blog.author)[0]
    const blogToBeSaved = new Blog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: user._id,
    })
    const savedBlog = await blogToBeSaved.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
  }
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, initialUsers, initiateDb, blogsInDb, usersInDb
}
