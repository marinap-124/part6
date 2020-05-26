import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {

  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':
      const changedAnecdote = action.data
      return state.map(anecdote =>
        anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote 
      )

    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const voteOf = (anecdote) => {
  
  return async dispatch => {
    const changedAnecdote = { 
      ...anecdote, 
      votes: anecdote.votes + 1 
    } 

    const changedFromDb = await anecdoteService.update(anecdote.id, changedAnecdote)

    dispatch({
      type: 'VOTE',
      data: changedFromDb,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default reducer