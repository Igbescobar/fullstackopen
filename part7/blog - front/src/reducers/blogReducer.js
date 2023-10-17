import { createSlice } from "@reduxjs/toolkit"
import blogsService from "../services/blogsService"

const blogSlice = createSlice({
    name: 'blog',
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            state.concat(action.payload)
        },
        setBlog(state, action) {
            return action.payload
        },
        voteBlog(state, action) {
            const id = action.payload.id
            const blogToChange = action.payload

            return state.map(blog =>
                blog.id !== id ? blog : blogToChange
            )
        },
        deleteBlog(state, action) {
            state.filter((blog) => blog.id !== action.payload.id)
        }
    }
})

export const { appendBlog, setBlog, voteBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogsService.getAll()
        dispatch(setBlog(blogs))
    }
}

export const createBlog = (content) => {
    return async dispatch => {
        const newBlog = await blogsService.create(content)
        dispatch(appendBlog(newBlog))
    }
}

export const addLike = blog => {
    return async dispatch => {
        try {
            const updatedBlog = await blogsService.update({
                ...blog,
                likes: blog.likes + 1
            });
            console.log('After the backend call. Updated blog:', updatedBlog);
            dispatch(voteBlog(updatedBlog));
        } catch (error) {
            console.error('Error updating blog likes:', error);
        }
    }
}

export const deleteBlogs = id => {
    return async dispatch => {
        const newBlog = await blogsService.remove(id)
        dispatch(deleteBlog(newBlog))

    }
}

export default blogSlice.reducer