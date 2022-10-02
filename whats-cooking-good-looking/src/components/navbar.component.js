import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../auth-provider";

// TODO: fix navbar/logout feature (use effect?)
export default function Navbar() {
  const auth = useAuth();
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
            <button onClick={auth.logout()}>Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}