import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams} from "react-router-dom"
import { showNotification, setNotification } from "./reducers/notificationReducer";
import {Route, Routes, Link} from "react-router-dom"

import { Container } from '@mui/material'

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import UserList from "./components/UserList";

import blogService from "./services/blogs";
import loginService from "./services/login";
import userService from "./services/user";
import { addBlog, initializeBlogs } from "./reducers/blogReducer";
import { loginUser, logoutUser, setUser } from "./reducers/userReducer";
import BlogList from "./components/BlogList";
import User from "./components/User";

import {
  AppBar,Toolbar,Button
} from '@mui/material'

const App = () => {
  const user = useSelector((state)=> state.user)
  const blogs = useSelector((state) => state.blogs)
  //const [notification, setNotification] = useState(null);
  const blogFormRef = useRef();
  const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, []);

  

  useEffect(() => {
    const userFromStorage = userService.getUser();
    if (userFromStorage) {
      dispatch(setUser(userFromStorage))
    }
  }, []);

  const login = async (username, password) => {
    
    dispatch(loginUser({username, password}))
    dispatch(showNotification({message: `${username} has logged in`, type: 'success'}, 2))
    //console.log('login',user)
    // loginService
    //   .login({
    //     username,
    //     password,
    //   })
    //   .then((user) => {
    //     setUser(user);
    //     userService.setUser(user);
    //     dispatch(showNotification({message: `${username} has logged in`, type: 'info'}, 2))
    //     notify(`${user.name} logged in!`);
    //   })
    //   .catch(() => {
    //     dispatch(showNotification({message: 'wrong username/password', type: 'alert'}, 2))
    //     notify("wrong username/password", "alert");
    //   });
  };

  const logout = () => {
    dispatch(logoutUser())
    dispatch(showNotification({message: `You have logged out, Good bye!`, type: 'info'}, 2))
  };

  const createBlog = async (blog) => {
    // blogService
    //   .create(blog)
    //   .then((createdBlog) => {
    //     notify(
    //       `a new blog '${createdBlog.title}' by ${createdBlog.author} added`
    //     );
    //     setBlogs(blogs.concat(createdBlog));
    //     blogFormRef.current.toggleVisibility();
    //   })
    //   .catch((error) => {
    //     notify("creating a blog failed: " + error.response.data.error, "alert");
    //   });
    dispatch(addBlog(blog))
    dispatch(showNotification({message:`a new blog '${blog.title}' was added by ${blog.author}`, type:'info'}, 2))
  };

  const removeBlog = (id) => {
    const toRemove = blogs.find((b) => b.id === id);

    const ok = window.confirm(
      `remove '${toRemove.title}' by ${toRemove.author}?`
    );

    if (!ok) {
      return;
    }

    blogService.remove(id).then(() => {
      const updatedBlogs = blogs.filter((b) => b.id !== id).sort(byLikes);
    });
  };

  const likeBlog = async (id) => {
    const toLike = blogs.find((b) => b.id === id);
    const liked = {
      ...toLike,
      likes: (toLike.likes || 0) + 1,
      user: toLike.user.id,
    };

    blogService.update(liked.id, liked).then((updatedBlog) => {
      notify(`you liked '${updatedBlog.title}' by ${updatedBlog.author}`);
      const updatedBlogs = blogs
        .map((b) => (b.id === id ? updatedBlog : b))
        .sort(byLikes);
    });
  };

  const notify = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };
  
  if (user ==null) {
    return (
      <>
        <Notification />
        <LoginForm onLogin={login} />
      </>
    );
  }
  
  return (
    <Container>
      <div>
        <h2>blogs</h2>

        <Notification />

        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/blogs">
              blogs
            </Button>
            <Button color="inherit" component={Link} to="/users">
              users
            </Button>
            {user.name} logged in
            <button onClick={logout}>logout</button>
          </Toolbar>
        </AppBar>

        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <NewBlogForm onCreate={createBlog} />
        </Togglable>

        
        <Routes>
          <Route path="/" element={<BlogList/>}/>
          <Route path="/blogs" element={<BlogList/>}/>
          <Route path="/users" element ={<UserList/>} />
          <Route path="/users/:id" element={<User/>}/>
          <Route path="/blogs/:id" element={
            <Blog
              user={user}
            />
          }/>
          
        </Routes>
        
      </div>
    </Container>
  );
};

export default App;
