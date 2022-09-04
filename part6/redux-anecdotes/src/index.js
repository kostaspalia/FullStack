import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
//import reducer, { setAnecdotes } from './reducers/anecdoteReducer'
import store from './store'
import anecdoteReducer, {setAnecdotes} from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'
//const store = createStore(reducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)

// anecdoteService.getAll().then(anecdotes => 
//   store.dispatch(setAnecdotes(anecdotes))
//   )
