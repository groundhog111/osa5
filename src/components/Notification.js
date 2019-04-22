import React from "react"
import { connect } from 'react-redux'

const Notification = (props) => {
  const message = props.notification.notification
  const className = props.notification.className

  if (message === '') {
    return null
  }

  return (
    <div className={className}>
      {message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return { notification: state.notification }
}

const ConnectedNotes = connect(
  mapStateToProps
)(Notification)

export default ConnectedNotes
