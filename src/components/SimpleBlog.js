import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div className = "kokoPaska" >
    <div className = "titleAuthor">
      {blog.title} {blog.author}
    </div>
    <div className = "likes">
      blog has {blog.likes} likes
      <button className = "likeButton" onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog