import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  case 'CLEAR_USER':
    return null
  default:
    return state
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login(username, password)
    window.localStorage.setItem(
      'loggedNoteappUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export const alreadyLogedIn = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: "SET_USER",
        data: user
      })
    }
  }
}



export const logout = () => {
  return dispatch => {
    dispatch({
      type: "CLEAR_USER"
    })
  }
}

export default userReducer
