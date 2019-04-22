import React, { useState } from "react"
import blogService from '../services/blogs'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const CreateBlog = (props) => {
  const refreshBlogs = props.refreshBlogs
  const blogFormRef = props.blogFormRef

  const [author, setAuthor] = useState("")
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")

  // const blogSchema = mongoose.Schema({
  //   title: { type: String, required: true },
  //   author: String,
  //   url: { type: String, required: true },
  //   likes: Number,
  //   user: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'User'
  //   }
  // })

  const handleSubmit = async (event) => {
    event.preventDefault()
    const objekti = { author, title, url, likes: 0 }
    await blogService.create(objekti)
    setAuthor("")
    setTitle("")
    setUrl("")
    blogFormRef.current.toggleVisibility()
    await refreshBlogs()
    props.setNotification("uusi blogi luotiin onnistuneesti","SUCCESS", 3)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type = "submit" >submit</button>
      </form>
    </div>
  )
}


const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = {
  setNotification
}

const ConnectedCreateBlog = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateBlog)

export default ConnectedCreateBlog