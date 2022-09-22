import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            const message = action.payload
            console.log(message)
            return message
        }
    }
})

export const showNotification = (message, delay) => {
    return async dispatch => {
        dispatch(setNotification(message))
        setTimeout(()=> dispatch(setNotification(null)), delay * 2000)
    }
}

export const {setNotification} = notificationSlice.actions
export default notificationSlice.reducer