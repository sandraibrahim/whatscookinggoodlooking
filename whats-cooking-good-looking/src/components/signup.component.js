import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from "../auth-provider";

/*
FUNCTION/COMPONENT NAME
    Signup - allows user to sign up for an account if they have don't have one and
    authorizes it.

SYNOPSIS
    Signin variables   
        username --> username of user
        password --> password of user
        email --> email of user
        first_name --> first name of user
        last_name --> last name of user
                                                         
DESCRIPTION
        This function takes care of creating a form to allow the user to sign
        up for an account with required credentials. It authenticates the user and makes
        sure their information is valid. After this, it signs in the user and allows them 
        to access the app.
*/
export default function SignUp() {
    // Authentication.
    const auth = useAuth();

    // Hooks.
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [first_name, setfirst_name] = useState("");
    const [last_name, setlast_name] = useState("");

    // Called when user submits form.
    const handleSubmit = async e => {
        e.preventDefault();

        // Creates user object.
        const user = {
            username: username,
            password: password,
            email: email,
            first_name: first_name,
            last_name: last_name
        }

        // Post request with user object that calls server to authenticate
        // user and adds them to database if no errors occur.
        axios.post('http://localhost:8080/signup', user)
            // User is valid.
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
        // Creates a sign up form.
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
