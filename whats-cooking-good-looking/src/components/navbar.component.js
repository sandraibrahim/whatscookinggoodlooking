import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../auth-provider";

export default function Navbar() {
  const auth = useAuth();

  const handleSubmit = async e => {
    auth.logout();
  }

  return (
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
            <button onClick={() => handleSubmit()}>Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}