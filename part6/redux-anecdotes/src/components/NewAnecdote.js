import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import anecdoteService from '../services/anecdotes'
const NewAnecdote = (props) => {
    const dispatch = useDispatch()

    const newAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value=''
        //const newAnecdote = await anecdoteService.createNew(content)
        dispatch(addAnecdote(content))
    }

    return (
        <div>
          <h2>create new</h2>
          <form onSubmit={newAnecdote}>
            <input name="anecdote" />
            <button type="submit">create</button>
          </form>
        </div> 
    )
}

export default NewAnecdote