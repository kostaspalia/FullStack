const dummy = (blogs) => {
    return 1
}

const totalLikes =  (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const max = blogs.reduce((prev, current) =>
        (prev.likes > current.likes) ? prev : current)

    const retBlog = {
        title: max.title,
        author: max.author,
        likes: max.likes
    }
    return retBlog

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}