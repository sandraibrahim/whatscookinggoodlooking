import React from 'react';
import { useAuth } from "../auth-provider";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import "../styles/navbar.css";

/*
FUNCTION/COMPONENT NAME
    Navbar - Creates the navbar that will allow user to naviagte to different
    sections of app.

SYNOPSIS
    Navbae variables   
        None                                                

DESCRIPTION
        This function takes care of creating the navbar for the whole app.
        It allows the user to go to different sections of the website (if they
        are authorized/signed in.)
*/
export default function AppNavBar(props) {
  // Authorization.
  const auth = useAuth();

  // When user clicks logout, it will log the user out and remove their info
  // from local storage.
  const handleSubmit = async e => {
    auth.logout();
  }

  return (
    // Creates NavBar.
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt=""
            src={require('../assets/logo.png')}
            width="100"
            height="60"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Brand href="/">What's Cooking Good Looking?</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/ingredients">Ingredients</Nav.Link>
            <Nav.Link href="/addingredient">Add Ingredient</Nav.Link>
            <Nav.Link href="/recipes">Search Recipes</Nav.Link>
            <Nav.Link href="/saverecipe">Your Saved Recipes</Nav.Link>

          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className='logout-button'>
            Signed in as: <span className='username'>{props.user}</span>
          </Navbar.Text>
          <Button variant="outline-danger" onClick={() => handleSubmit()}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
}