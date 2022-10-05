import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../auth-provider";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../styles/signup.css";
import FormGroup from 'react-bootstrap/esm/FormGroup';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import InputGroup from 'react-bootstrap/InputGroup';

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
    let navigate = useNavigate();
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
            <Card>
                <CardHeader className='header'>
                    <div className='header'>Sign Up</div>
                </CardHeader>
                <Card.Body className='card-content'>
                    <div className='card-content'>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <div className='input-divider'>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                                        <Form.Control className="input-size" type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                                    </InputGroup>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <div className='input-divider'>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                        <Form.Control className="input-size" type="text" placeholder="Username" onChange={e => setUserName(e.target.value)} />
                                    </InputGroup>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <div className='input-divider'>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon1">#</InputGroup.Text>
                                        <Form.Control className="input-size" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                                    </InputGroup>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <div className='input-divider'>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon1">First Name</InputGroup.Text>
                                        <Form.Control className="input-size" type="text" placeholder="First Name" onChange={e => setfirst_name(e.target.value)} />
                                        <InputGroup.Text id="basic-addon1">Last Name</InputGroup.Text>
                                        <Form.Control className="input-size" type="text" placeholder="Last Name" onChange={e => setlast_name(e.target.value)} />
                                    </InputGroup>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <div className='input-divider'>
                                    <Button variant="outline-secondary" size="lg" type="submit">Sign Up</Button>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Button variant="link" className="px-4" onClick={() => navigate("/")}>
                                    Already have an account? Sign In Here!
                                </Button>
                            </FormGroup>

                        </Form>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}
