import React, { useState } from "react"
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const CreateBlog = ({ refreshBlogs, setSuccessMessage, blogFormRef }) => {
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
    setSuccessMessage('Luotu uusi blogi onnistuneesti')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
    // ^antaa responseksi palvelimen responsen
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

CreateBlog.propTypes = {
  setSuccessMessage: PropTypes.func.isRequired
}

export default CreateBlog