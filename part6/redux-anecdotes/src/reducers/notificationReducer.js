import { createSlice } from '@reduxjs/toolkit'

const notificationAtStart=" "

const notificationSlice = createSlice({
    name: 'notification',
    initialState: notificationAtStart,
    reducers: {
        setMessage(state, action) {
            const message = action.payload
            console.log(message)
            state = message
            setTimeout(() => {deleteMessage(message)},2000)
            return state
            
        },
        deleteMessage(state, action){
            console.log(action.payload)
            return " "
        }
    }
})

export const  showNotification = (message, delay) => {
    return async dispatch => {
        dispatch(setMessage(message))
        setTimeout(() => dispatch(deleteMessage(message)), delay * 1000);
    }
}

export const { setMessage, deleteMessage } = notificationSlice.actions
export default notificationSlice.reducer