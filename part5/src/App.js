/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title,setTitle] = useState('')
  const [url,setUrl] = useState('')
  const [author,setAuthor] = useState('')
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  //const [blogVisible, setBlogVisible] = useState(false)

  // const blogForm = () => {
  //   const hideWhenVisible = { display: blogVisible ? 'none' : ''}
  //   const showWhenVisible = { display: blogVisible ? '' : 'none'}

  //   return (
  //     <div>
  //       <div style={hideWhenVisible}>
  //         <button onClick={() => setBlogVisible(true)}>create</button>
  //       </div>
  //       <div style={showWhenVisible}>
  //         <BlogForm
  //           addBlog={addBlog}
  //           setTitle
  //           setAuthor
  //           setUrl
  //           title={title}
  //           author={author}
  //           url={url}
  //         />
  //       </div>
  //     </div>
  //   )
  // }

  const addLike = async (id, blogObject) => {
    await blogService.update(id, blogObject)
    setBlogs(await blogService.getAll())
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      console.log(user)
      await blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')


    } catch (exception) {
      console.log('hey')
      //setErrorMessage('Wrong credentials')
      notify('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type='info') => {
    setNotification({ message })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  console.log(user)
  if (user === null) {
    return (
      <div>
        <h1>Blogs</h1>
        <h2>Log in to application</h2>
        <Notification notification={notification} />
        <form onSubmit={handleLogin}>
          <div>
          username
            <input
              id='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
          password
            <input
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">login</button>
        </form>
      </div>
    )
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = { author: author,title: title, url:url }

    //blogService.create(blogObject).then(returnedBlog => {
    const newObject= await blogService.create(blogObject)
    console.log(newObject)
    //setBlogs(blogs.concat(newObject))
    setBlogs(await blogService.getAll())
    notify(`a new blog ${blogObject.title} by ${blogObject.author} was added`)
    //setErrorMessage(`${blogObject.name} was added`)
  }

  const removeBlog = async (id) => {
    const blog = blogs.filter((blog) => blog.id === id)
    if (window.confirm(`Remove bloh ${blog.title} by ${blog.author}`)){
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
    }

  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} />
      {user.name} logged in
      <Togglable buttonLabel='create new blog'>
        <BlogForm
          addBlog={addBlog}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setUrl={setUrl}
          title={title}
          author={author}
          url={url}
        />

      </Togglable>

      {/* <h2>add a new</h2>
      <form onSubmit={addBlog}>
        <div>
          title: <input value={title}
          onChange={({target}) => setTitle(target.value)}/>
        </div>
        <div>
          author: <input value={author}
          onChange={({target}) => setAuthor(target.value)}/>
        </div>
        <div>
          url: <input value={url}
          onChange={({target}) => setUrl(target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form> */}
      {(blogs.sort((a, b) => b.likes - a.likes)).map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog}/>
      )}
      <button onClick={handleLogout}>log out</button>
    </div>
  )
}

export default App
