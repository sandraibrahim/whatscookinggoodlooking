import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import IngredientsList from "./components/ingredients-list.component";
import EditIngredients from "./components/edit-ingredients.component";
import AddIngredient from "./components/add-ingredient.component";
import CreateUser from "./components/create-user.component";
import SignIn from "./components/signin.component";
import SignUp from "./components/signup.component";

// TODO: Set token and render personal data.
function setJWT(userToken) {
  sessionStorage.setItem('token', userToken);
  setToken(userToken);
  console.log("success");
}

// function getToken() {
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token
// }

function App() {
  const [token, setToken] = useState();
  if (!token) {
    return <SignIn setJWT={setJWT} />
  }
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Routes>
          <Route path="/" element={<IngredientsList />} />
          <Route path="/signin" element={<SignIn setJWT={setJWT} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/edit/:id" element={<EditIngredients />} />
          <Route path="/addingredient" element={<AddIngredient />} />
          <Route path="/user" element={<CreateUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
