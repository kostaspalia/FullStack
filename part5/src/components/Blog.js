import { useState } from 'react'


const Blog = ({ blog, addLike, removeBlog }) => {

  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setExpanded(!expanded)
  }

  const update = () => {
    const likedBlog = {
      user: blog.user,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes+1
    }
    addLike(blog.id, likedBlog)
  }

  const deleteBlog = () => {
    removeBlog(blog.id)
  }

  if(expanded===false){
    return(
      <div className='blog' style={blogStyle}>
        <div>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
        </div>
      </div>
    )
  }else{
    return(
      <div className='blog' style={blogStyle}>
        <div>
          {blog.title}  <button onClick={toggleVisibility}>hide</button>
          <br/>{blog.url}
          <br/>likes: <span id='likes'> {blog.likes?blog.likes : 0} </span> <button id='like-button' onClick={update}>like</button>
          <br/>{blog.author}
          <br/><button onClick={deleteBlog}>remove</button>
        </div>
      </div>
    )
  }

}

export default Blog