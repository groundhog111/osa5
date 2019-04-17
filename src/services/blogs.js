
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const clearToken = () => token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const put = async (blog) => {

  const config = {
    headers: { Authorization: token },
  }

  const newObject = {
    author: blog.author,
    title: blog.title,
    url: blog.url,
    likes: blog.likes + 1
  }

  const response = await axios.put(`${baseUrl}/${blog.id}`, newObject, config)
  return response.data
}

const deleteBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response
}

// const blog = {
//   title: request.body.title,
//   author: request.body.author,
//   likes:request.body.likes,
//   url: request.body.url
// }

export default { getAll, setToken, clearToken, create, put, deleteBlog }