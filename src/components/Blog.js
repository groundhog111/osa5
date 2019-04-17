import React, { useState } from 'react'

const Blog = ({ blog, blogServicePut, refreshBlogs, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    try {
      await blogServicePut(blog)
    } catch { console.log("blogServicePut ei täyttänyt promisea") }
    
    refreshBlogs()
  }

  const handleDelete = async () => {
    if( window.confirm("Remove blog ", blog.title, " ", blog.author) )
    try {
      await deleteBlog(blog)
    } catch { console.log("blogservicedelete ei täyttänyt promisea")}
    refreshBlogs()
  }

  const deleteButton = () => {
    if(user.username.toString() === blog.user.username.toString()){
      return <button onClick = {() => handleDelete()}>delete</button>
    }
  }

  const expanded = () => {
    return <div className = "Blog" >
      <p className = "klikkiOtsikko" onClick={toggleVisibility} > {blog.title} {blog.author} </p>
      {blog.url}
      <br/>
      {blog.likes} likes
      <button onClick = {() => handleLike()}>like</button>
      <br/>
      added by {blog.author}
      <br/>
      {deleteButton()}
    </div>
  }

  const narrow = () => (
    <div  className = "Blog" >
    <p onClick={toggleVisibility} > {blog.title} {blog.author} </p>
    </div>
  )

  return visible ? expanded() : narrow()
}

export default Blog