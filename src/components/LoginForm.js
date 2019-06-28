import React from 'react'
import PropTypes from 'prop-types'

const loginForm = ({
  handleLogin,
  username,
  password
}) => {

  return <div>
    <h2>Log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>
        käyttäjätunnus
        <input
          // name="Username"
          // type={username.type}
          // value={username.value}
          // onChange={( event ) => username.onChange(event)}
          {...username}
          //selvitä
        />
      </div>
      <div>
        salasana
        <input
          // type={password.type}
          // value={password.value}
          // name="Password"
          // onChange={( event ) => password.onChange(event)}
          {...password}
        />
      </div>
      <button type="submit">kirjaudu</button>
    </form>
  </div>
}

loginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default loginForm