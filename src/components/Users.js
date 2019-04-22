import React from "react"
import { connect } from 'react-redux'
import _ from 'lodash'

const Users = (props) => {
  const allUsersListed = props.blogs

  if (allUsersListed.length === 0) {
    return null
  }

  const blogsMadeByUsers = Object.entries(
    _.countBy(allUsersListed, u => u.user.username)
  )

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td></td>
            <th>blogs</th>
          </tr>
          {blogsMadeByUsers.map(blogPair => (
            <tr key={blogPair[0]}>
              <td>{blogPair[0]}</td>
              <td>{blogPair[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { blogs: state.blogs }
}

const ConnectedUsers = connect(
  mapStateToProps
)(Users)

export default ConnectedUsers
