import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getUsers } from "../reducers/userListReducer";
import userService from "../services/user";
import { Link } from "react-router-dom"

import {
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
  } from '@mui/material'

const UserList = () =>{
    const users = useSelector((state)=>state.userList)
    const dispatch = useDispatch()
    useEffect(()=>dispatch(getUsers()),[])

    if(!users){
        return null
    }
    return(
      <div id="users">
        <h2>Users</h2>
        <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        name
                    </TableCell>
                    <TableCell>
                        blogs created
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>
                            <Link to={`/users/${user.id}`}>
                            {user.username}
                            </Link>
                        </TableCell>
                        <TableCell>
                            {user.blogs.length}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </TableContainer> 
      </div>
       
    )
}

export default UserList