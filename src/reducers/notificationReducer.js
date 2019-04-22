const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data
  case 'CLEAR_NOTIFICATION':
    return ''
  default:
    return state
  }
}

export const setNotification = (notification, className, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { notification, className }
    })
    const timeInMills = time * 1000
    setTimeout( () => {
      dispatch({
        type: "CLEAR_NOTIFICATION"
      })},
    timeInMills
    )
  }
}


// export const voteAnecdote = (anecdoteVoted) => {
//   return async dispatch => {
//     const anecdote = await anecdoteService.vote(anecdoteVoted)
//     dispatch({
//       type: 'VOTE',
//       data: anecdote
//     })
//   }
// }

export default notificationReducer
