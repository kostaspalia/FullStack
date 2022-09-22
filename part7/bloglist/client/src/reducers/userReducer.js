import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import userService from "../services/user";


const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            console.log(action.payload)
            return action.payload
        },
        clearUser(state, action) {
            return action.payload
        }
    }
})

export const {setUser, clearUser} = userSlice.actions

export const loginUser = (info) => {
    return async (dispatch) => {
        console.log('sfsdf')
        const {username, password} = info
        const user = await loginService.login({username, password})
        
        userService.setUser(user)
        // eslint-disable-next-line no-undef
        dispatch(setUser(user))
    }
}

export const logoutUser = () => {
    return async (dispatch) => {
        userService.clearUser()
        // eslint-disable-next-line no-undef
        dispatch(clearUser(null))
    }
}

export default userSlice.reducer