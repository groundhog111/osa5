import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'SET_BLOGS':
    return action.data
  default:
    return state
  }
}

export const setBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'SET_BLOGS',
      data: blogs
    })
  }
}

export default blogReducer
