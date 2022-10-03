import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../auth-provider";

export default function SignIn({ setJWT }) {
  let navigate = useNavigate();
  const auth = useAuth();

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();


  const handleSubmit = async e => {
    e.preventDefault();
    axios.post('http://localhost:8080/signin', { username, password })
      // User is validated
      .then(data => {
        auth.login(data);
      })
      .catch(function (error) {
        if (error.response.status === 422) {
          console.log("Missing Username and/or Password!")
        }
        else if (error.response.status === 404) {
          console.log("User not found :((")
        }
        else if (error.response.status === 400) {
          console.log("Incorrect Password")
        }
        else {
          console.log("Something went wrong. Please try again.")
        }
      })
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
      <button color="primary" className="px-4" onClick={() => navigate("signup")}>
        Don't have an account? Sign Up!
      </button>
    </div >

  )
}
