import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


export default function SignIn({ setJWT }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    axios.post('http://localhost:8080/signin', { username, password })
      .then(data => setJWT(data.data.token))


  }

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

SignIn.propTypes = {
  setToken: PropTypes.func.isRequired
};