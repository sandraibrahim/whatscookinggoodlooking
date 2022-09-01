import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import IngredientsList from "./components/ingredients-list.component";
import EditIngredients from "./components/edit-ingredients.component";
import AddIngredient from "./components/add-ingredient.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className = "container">
        <Navbar />
        <br/>
        <Routes>
          <Route path = "/" element={<IngredientsList />} />
          <Route path = "/edit/:id" element={<EditIngredients />} />
          <Route path = "/addingredient" element={<AddIngredient />} />
          <Route path = "/user" element={<CreateUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
