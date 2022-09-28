import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export default function SignUp({ setJWT }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [fname, setFname] = useState();
    const [lname, setLname] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        axios.post('http://localhost:8080/signup', { username, password })
            .then(data => setJWT(data.data.token))
            .catch(function (error) {
                if (error.response.status === 422) {
                    console.log("Missing Required Credentials")
                }
                else if (error.response.status === 400) {
                    console.log("Email already exists, try signing in.")
                }
                else {
                    console.log("Something went wrong. Please try again.")
                }
            })
    }

    return (
        <div className="login-wrapper">
            <h1>Please Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <label>
                    <p>Email</p>
                    <input type="text" onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    <p>First Name</p>
                    <input type="text" onChange={e => setFname(e.target.value)} />
                </label>
                <label>
                    <p>Last Name</p>
                    <input type="text" onChange={e => setLname(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

SignUp.propTypes = {
    setToken: PropTypes.func.isRequired
};