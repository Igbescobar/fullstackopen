import { createSlice } from "@reduxjs/toolkit";
import commentService from '../services/commentService'

const commentSlice = createSlice({
    name: 'comment',
    initialState: [],
    reducers: {
        appendComment: (state, action) => {
            state.push(action.payload)
        },
        setComment: (state, action) => {
            return action.payload
        }
    }
})

export const { appendComment, setComment } = commentSlice.actions

export const initializeComments = (id) => {
    return async dispatch => {
        const comments = await commentService.getAll(id)
        dispatch(setComment(comments))
        console.log('comments from dispatcher,', comments)
    }
}

export const createComment = (id, comment) => {
    return async dispatch => {
        const newComment = await commentService.create(id, comment)
        dispatch(appendComment(newComment))
    }
}

export default commentSlice.reducer