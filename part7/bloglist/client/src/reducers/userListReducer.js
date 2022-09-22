import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user";

const userListSlice = createSlice({
    name:'userList',
    initialState: null,
    reducers: {
      setUsers(state, action){
        return action.payload
      }
    }
})

export const {setUsers} = userListSlice.actions

export const getUsers = () =>{
    return async (dispatch) => {
        const users = await userService.getAll()
        console.log('users',users)
        // eslint-disable-next-line no-undef
        dispatch(setUsers(users))
    }
}

export default userListSlice.reducer