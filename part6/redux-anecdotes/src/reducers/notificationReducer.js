import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        printNotification(state, action) {
            return action.payload
        }
    }
})

export const { printNotification } = notificationSlice.actions
export default notificationSlice.reducer
