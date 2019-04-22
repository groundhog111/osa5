import React, { useEffect } from 'react'
import blogService from './services/blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import { useField } from './hooks/index'
import './index.css'

import { connect } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { setBlogs } from './reducers/blogReducer'
import { login, logout, alreadyLogedIn } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

const App = (props) => {
  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    props.setBlogs()
  }, [])

  useEffect(() => {
    props.alreadyLogedIn()
  }, [])

  const refreshBlogs = () => {
    props.setBlogs()
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await props.login(username.value, password.value)
      username.reset()
      password.reset()
    }
    catch (exception) {
      console.log('exception', exception)
      username.reset()
      password.reset()
      props.setNotification("Käyttäjä tai salasana väärä", "ERROR", 2)
    }
  }


  const blogsMap = () => (
    <div>
      <h2>blogs</h2>
      {props.blogs
        .sort((a, b) => (a.likes < b.likes ? 1 : -1))
        .map(blog => (
          <Blog
            blogServicePut={() => blogService.put(blog)}
            key={blog.id}
            blog={blog}
            refreshBlogs={refreshBlogs}
            deleteBlog={() => blogService.deleteBlog(blog)}
            user={props.user}
          />
        ))}
    </div>
  );

  const blogFormRef = React.createRef()

  const loggedIn = () => {
    return (
      <div>
        <Route
          exact path="/"
          render={() => (
            <div>
              {
                <Togglable buttonLabel="Create Blog" ref={blogFormRef}>
                  <CreateBlog
                    refreshBlogs={refreshBlogs}
                    blogFormRef={blogFormRef}
                  />
                </Togglable>
              }
              {blogsMap()}
            </div>
          )}
        />
        <Route path="/users" render={() => <Users />} />
      </div>
    )
  }

  const notLoggedIn = () => (
    <LoginForm
      handleLogin={event => handleLogin(event)}
      password={password}
      username={username}
    />
  )

  const navBar = () => (
    <div>
      <Link to="/">Blogs</Link>
      <Link to="/users">Users</Link>
      {props.user === null ? null : ` ${props.user.username} logged in`}
      {props.user === null ? null : (
        <button
          onClick={() => {
            props.logout()
            window.localStorage.removeItem("loggedNoteappUser")
            blogService.clearToken()
          }}
        >
          logout
        </button>
      )}
    </div>
  )

  return (
    <div>
      <Router>
        {navBar()}
        <Notification />
        {props.user === null ? notLoggedIn() : loggedIn()}
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = {
  setNotification,
  setBlogs,
  login,
  logout,
  alreadyLogedIn
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp

