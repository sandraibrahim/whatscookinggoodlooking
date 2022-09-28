import React, { Component } from 'react';
import { Link } from 'react-router-dom';


// TODO: Turn to functional and accept selected prop.
export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Recipe Maker</Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/ingredients" className="nav-link">Ingredients</Link>
            </li>
            <li className="navbar-item">
              <Link to="/addingredient" className="nav-link">Add Ingredient</Link>
            </li>
            <li className="navbar-item">
              <Link to="/user" className="nav-link">Create User</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}