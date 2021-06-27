const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length == 0) {
    return []
  } else {
    const blogWithMaxLikes = blogs.reduce((x, y) => x.likes < y.likes ? y : x)
    return {
      title: blogWithMaxLikes.title,
      author: blogWithMaxLikes.author,
      likes: blogWithMaxLikes.likes
    }
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}