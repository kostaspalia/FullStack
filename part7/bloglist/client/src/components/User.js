import { useSelector } from "react-redux"
import {useParams} from "react-router-dom"

const User = () => {
    const {id} = useParams()
    console.log(id)
    const user = useSelector(state => state.userList.find(theUser => theUser.id === id))

    if(!user){
        return null
    }

    return (
        <div>
            <h2>{user.username}</h2>
            <h3>added blogs</h3>
            <ul>
                {user.blogs.map(blog => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default User