import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteOf } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const anecdotes = useSelector(({filter, anecdotes}) => {
      if ( filter === '' ) {
        return anecdotes.sort((a, b) => b.votes-a.votes)
      }
      return anecdotes.filter(an => an.content.includes(filter)).sort((a, b) => b.votes-a.votes);
    })

    const dispatch = useDispatch()

    const vote = (anecdote) => {
      dispatch(voteOf(anecdote))
    }

    const showNotification = (notification) => {
      dispatch(setNotification(notification, 5))
    }

  
    return (
        <div>
          {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => { vote(anecdote); showNotification('You voted "' + anecdote.content+'"') }} >vote</button>
              </div>
            </div>
          )}
        </div>
      )
  }
  
  export default AnecdoteList