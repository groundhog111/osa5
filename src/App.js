import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { useField } from './hooks/index'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // const [username, setUsername] = useState('')
  const username = useField('text')
  const password = useField('password')
  // const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username.value, password.value)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
    } catch (exception) {
      username.reset()
      password.reset()
      setErrorMessage('käyttäjätunnus tai salasana virheellinen')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const refreshBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }

  const blogsMap = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.username} logged in</p>
      <button
        onClick={() => {
          setUser(null)
          window.localStorage.removeItem("loggedNoteappUser")
          blogService.clearToken()
        }}
      >
        logout
      </button>
      {blogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1).map(blog => (
        <Blog
          blogServicePut={() => blogService.put(blog)}
          key={blog.id}
          blog={blog}
          refreshBlogs={refreshBlogs}
          deleteBlog={() => blogService.deleteBlog(blog)}
          user = {user}
        />
      ))}
    </div>
  )

  const blogFormRef = React.createRef()

  const loggedIn = () => (
    <div>
      {
        <Togglable buttonLabel = "Create Blog" ref = {blogFormRef}>
          <CreateBlog
            setSuccessMessage={message => setSuccessMessage(message)}
            refreshBlogs={refreshBlogs}
            blogFormRef={blogFormRef}
          />
        </Togglable>
      }
      {blogsMap()}
    </div>
  )

  return (
    <div>
      <Notification message={successMessage} className="success" />
      <Notification message={errorMessage} className="error" />
      {user === null ? (
        <LoginForm
          handleLogin={(event) => handleLogin(event)}
          password={password}
          username = {username}
        />
      ) : (
        loggedIn()
      )}
    </div>
  )
}

export default App