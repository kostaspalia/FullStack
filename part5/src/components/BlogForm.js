import PropTypes from 'prop-types'

const BlogForm = ({
  addBlog,
  setTitle,
  setAuthor,
  setUrl,
  title,
  author,
  url
}) => {
  return(
    <form onSubmit={addBlog}>
      <div>
      title: <input value={title} placeholder='write here the blog title'
          onChange={({ target }) => setTitle(target.value)}/>
      </div>
      <div>
      author: <input value={author} placeholder='write here the blog author'
          onChange={({ target }) => setAuthor(target.value)}/>
      </div>
      <div>
      url: <input value={url} placeholder='write here the blog url'
          onChange={({ target }) => setUrl(target.value)}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setAuthor: PropTypes.func.isRequired,
  setUrl: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default BlogForm