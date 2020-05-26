const notificationReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.notification
      case 'HIDE_NOTIFICATION':
        return null
      default:
        return state
    }
  }
  
  let timeoutID
  export const setNotification = (notification, time) => {

    return async dispatch => {

      dispatch({
        type: 'SET_NOTIFICATION',
        notification,
      })

      clearTimeout(timeoutID)

      timeoutID = setTimeout(() => {dispatch({
        type: 'HIDE_NOTIFICATION'
      })}, time * 1000)

    }
  }

  
  export default notificationReducer 