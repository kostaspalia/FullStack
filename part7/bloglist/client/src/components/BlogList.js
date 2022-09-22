import Blog from "./Blog"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
  } from '@mui/material'

const BlogList = () => {
    const blogs = useSelector(state => state.blogs)  
    return(

      <TableContainer component={Paper}>
        <Table>
            <TableBody>
                {blogs.map((blog) => (
                    <TableRow key={blog.id}>
                        <TableCell>
                          <Link to={`/blogs/${blog.id}`}>
                            {blog.title}
                          </Link>
                        </TableCell>
                        <TableCell>
                          {blog.author}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      </TableContainer>  
      )
}

export default BlogList