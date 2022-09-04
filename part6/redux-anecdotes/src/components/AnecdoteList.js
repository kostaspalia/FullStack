import { useDispatch, useSelector } from "react-redux/es/exports";
import { voteAnecdote, addVote } from "../reducers/anecdoteReducer";
import { setMessage, deleteMessage, showNotification } from "../reducers/notificationReducer";


const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)

    return(
        <div>
          {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                dispatch(addVote(anecdote))
                //dispatch(setMessage(`you voted '${anecdote.content}'`))
                //setTimeout(() => {dispatch(deleteMessage())},5000)
                dispatch(showNotification(`you voted '${anecdote.content}'`, 5))
              }}>vote</button>
            </div>
          </div>
        ).sort((a, b) => (a.votes > b.votes ? -1 : 1))}
        </div>
        
    )
}

export default AnecdoteList
