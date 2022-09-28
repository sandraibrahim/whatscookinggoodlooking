import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import IngredientsList from "./components/ingredients-list.component";
import EditIngredients from "./components/edit-ingredients.component";
import AddIngredient from "./components/add-ingredient.component";
import CreateUser from "./components/create-user.component";
import SignIn from "./components/signin.component";
import SignUp from "./components/signup.component";

// function getToken() {
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token
// }

function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState();

  // const navigate = useNavigate();
  // const navigateToSignUp = () => {
  //   navigate('/signup');
  // };

  function setJWT(userToken) {
    sessionStorage.setItem('token', userToken);
    setToken(userToken);
  }

  // if (!token) {
  //   return <SignIn setJWT={setJWT} />
  // }
  return (
    <Routes>
      <Route path="/" element={<SignIn setJWT={setJWT} />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="ingredients" element={<IngredientsList />} />
      <Route path="edit/:id" element={<EditIngredients />} />
      <Route path="addingredient" element={<AddIngredient />} />
      <Route path="user" element={<CreateUser />} />
    </Routes>
  );
}

export default App;
