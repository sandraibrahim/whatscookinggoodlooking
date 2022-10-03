import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from "../auth-provider";

export default function SignUp() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [first_name, setfirst_name] = useState("");
    const [last_name, setlast_name] = useState("");
    const auth = useAuth();

    const handleSubmit = async e => {
        e.preventDefault();

        const user = {
            username: username,
            password: password,
            email: email,
            first_name: first_name,
            last_name: last_name
        }

        axios.post('http://localhost:8080/signup', user)
            .then(data =>
                auth.login(data)
            )
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
                    <input type="text" onChange={e => setfirst_name(e.target.value)} />
                </label>
                <label>
                    <p>Last Name</p>
                    <input type="text" onChange={e => setlast_name(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
