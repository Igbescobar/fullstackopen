const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    const total = blogs.reduce(function (sum, blog) {
        return sum + blog.likes
    }, 0)
    return total
}

const favouriteBlog = (blogs) => {
    const highest = blogs.reduce(function (a, b) {
        return a.likes > b.likes ? a : b
    }, 0)
    return highest
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}



module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    usersInDb
}