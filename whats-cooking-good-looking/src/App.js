import React from 'react';
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import IngredientsList from "./components/ingredients-list.component";
import EditIngredients from "./components/edit-ingredients.component";
import AddIngredient from "./components/add-ingredient.component";
import SignIn from "./components/signin.component";
import SignUp from "./components/signup.component";
import { ProtectedRoute } from "./protected-route.component";
import { AuthProvider } from "./auth-provider";
import Navbar from './components/navbar.component';


function App() {
  return (
    <AuthProvider>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />

        <Route
          path="ingredients"
          element={
            <ProtectedRoute>
              <IngredientsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="edit/:id"
          element={
            <ProtectedRoute>
              <EditIngredients />
            </ProtectedRoute>
          }
        />
        <Route
          path="addingredient"
          element={
            <ProtectedRoute>
              <AddIngredient />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
