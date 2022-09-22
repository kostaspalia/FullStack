import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";


const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers:{
        setBlogs(state, action){
            console.log(action.payload)
            return action.payload
        },
        appendBlog(state, action){
            state.push(action.payload)
        },
        likeBlog(state, action){
            const blogLiked = action.payload
            const {id} = blogLiked
            return state.map(blog => blog.id !== id ? blog : blogLiked)
            
        },
        removeBlog(state, action){
            const id = action.payload
            return state.filter( blog => blog.id !== id)
        },
        appendComment(state, action){
            const updatedBlog = action.payload
            const {id} = updatedBlog
            return state.map(blog => blog.id !== id ? blog : updatedBlog)
        }
    }
})

const { setBlogs, appendBlog, likeBlog, removeBlog, appendComment } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        
        // eslint-disable-next-line no-undef
        dispatch(setBlogs(blogs))
    }
}

export const addComment = (blog, comment) => {
    return async dispatch => {
        // const updated = {
        //     ...blog,
        //     comments: blog.comments.push(comment)
        // }
        const updatedBlog = await blogService.addComment(blog.id, comment)
        // eslint-disable-next-line no-undef
        dispatch(appendComment(updatedBlog))
    }
}

export const addBlog = blog => {
    return async dispatch => {
        const newBlog = await blogService.create(blog)
        // eslint-disable-next-line no-undef
        dispatch(appendBlog(newBlog))
    }
}

export const deleteBlog = blog => {
    return async dispatch => {
        await blogService.remove(blog.id)
        // eslint-disable-next-line no-undef
        dispatch(removeBlog(blog.id))
    }
}

export const addLike = blog => {
    return async dispatch => {
        
        const liked = {
            ...blog,
            likes: (blog.likes || 0) + 1,
            user: blog.user.id,
          };
        console.log(liked)
        const updatedBlog = await blogService.update(liked.id,liked)
        
        // eslint-disable-next-line no-undef
        dispatch(likeBlog(updatedBlog))
    }
}

export default blogSlice.reducer