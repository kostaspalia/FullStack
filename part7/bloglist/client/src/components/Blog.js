import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addLike, deleteBlog, ap, addComment } from "../reducers/blogReducer";
import {useParams} from "react-router-dom"
import { useSelector } from "react-redux"

const BlogDetails = ({ blog, visible, handleLike, handleDelete, handleComment, own }) => {
  if (!visible) return null;
  

  const addedBy = blog.user && blog.user.name ? blog.user.name : "anonymous";
  //console.log(blog.comments)
  return (
    <div>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes{" "}
        <button onClick={() => handleLike(blog)}>like</button>
      </div>
      {addedBy}
      {own && <button onClick={() => handleDelete(blog)}>remove</button>}
      <p>comments:</p>
      <form onSubmit={handleComment}>
        <input name="comment"/>
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, i)=>(
          <li key={i}>
            {comment}
          </li>
        ))}
      </ul>

    </div>
  );
};




const Blog = ({ user }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const {id} = useParams()
  const blog = blogs.find(blog=>blog.id===id)
  
  const style = {
    padding: 3,
    margin: 5,
    borderStyle: "solid",
    borderWidth: 1,
  };

  const handleLike = (blog) => {
    dispatch(addLike(blog))
  }

  const handleDelete = (blog) => {
    dispatch(deleteBlog(blog))
  }

  const handleComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    dispatch(addComment(blog, comment))
  }

  if(!blog){
    return null
  }

  return (
    <div style={style} className="blog">
      {blog.title} {blog.author}
      {/* <button onClick={() => setVisible(!visible)}>
        {visible ? "hide" : "view"}
      </button> */}
      <BlogDetails
        blog={blog}
        visible={true}
        handleLike={handleLike}
        handleDelete={handleDelete}
        handleComment={handleComment}
        own={blog.user && user.username === blog.user.username}
      />
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
};

export default Blog;
