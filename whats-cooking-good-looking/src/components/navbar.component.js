import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../auth-provider";

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
export default function Navbar() {
  // Authorization.
  const auth = useAuth();

  // When user clicks logout, it will log the user out and remove their info
  // from local storage.
  const handleSubmit = async e => {
    auth.logout();
  }

  return (
    // Creates NavBar.
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div className="navbar-brand">Recipe Maker</div>
      <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/ingredients" className="nav-link">Ingredients</Link>
          </li>
          <li className="navbar-item">
            <Link to="/addingredient" className="nav-link">Add Ingredient</Link>
          </li>
          <li className="navbar-item">
            <Link to="/recipes" className="nav-link">Recipes</Link>
          </li>
          <li className="navbar-item">
            <Link to="/saverecipe" className="nav-link">Saved Recipes</Link>
          </li>
          <li className="navbar-item">
            <button onClick={() => handleSubmit()}>Logout</button>
          </li>

        </ul>
      </div>
    </nav>
  );
}