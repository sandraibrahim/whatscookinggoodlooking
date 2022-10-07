import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from "../auth-provider";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../styles/signin.css";
import FormGroup from 'react-bootstrap/esm/FormGroup';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';

/*
FUNCTION/COMPONENT NAME
    Signin - allows user to sign in to their account if they have one and
    authorizes it.

SYNOPSIS
    Signin variables   
        username --> username of user
        password --> password of user
                                                         
DESCRIPTION
    This function takes care of creating a form to allow the user to sign
    in with their username and password. It authenticates the user and makes
    sure their information is valid. After this, it signs in the user grabbing
    all of their information specifically and sets it to local storage to be used.
*/
export default function SignIn() {
  // Authentication.
  const auth = useAuth();

  // Hooks.
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [show, setShow] = useState(false);


  // Called when user submits form.
  const handleSubmit = async e => {
    e.preventDefault();

    // Post request with username and password that calls server to authenticate
    // user and catch any signing in errors.
    axios.post('http://localhost:8080/signin', { username, password })
      // User is validated
      .then(data => {
        auth.login(data);
      })
      .catch(function (error) {
        if (error.response.status === 422) {
          setError("Missing Username and/or Password!");
          setShow(true);
        }
        else if (error.response.status === 404) {
          setError("User not found :((");
          setShow(true);
        }
        else if (error.response.status === 400) {
          setError("Incorrect Password");
          setShow(true);
        }
        else {
          setError("Something went wrong. Please try again.");
          setShow(true);
        }
      })
  }

  return (
    // Creates a sign in form.
    <div className="login-wrapper">

      <Alert show={show} variant="danger">
        <p>{error}</p>
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-danger">
            Close
          </Button>
        </div>
      </Alert>


      <Card>
        <CardHeader className='header'>
          <div className='header'>Sign In</div>
        </CardHeader>
        <Card.Body className='card-content'>
          <div className="card-content">
            <Form onSubmit={handleSubmit}>
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
                  <Button variant="outline-secondary" size="lg" type="submit">Log In</Button>
                </div>
              </FormGroup>
              <FormGroup>
                <Button variant="link" className="px-4" onClick={() => window.location = '/signup'}>
                  Don't have an account? Sign Up!
                </Button>
              </FormGroup>
            </Form>

          </div>
        </Card.Body>
      </Card>
    </div >

  )
}
