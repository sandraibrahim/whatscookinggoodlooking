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
import RecipeSearch from './components/recipe_search.component';
import SavedRecipe from './components/saved_recipes.component';
import Splash from './components/splash.component';

/*
FUNCTION
    App - Routes app

SYNOPSIS
    None
                                                         
DESCRIPTION
    This function is responsible for routing the app as nessesary. It stops the user
    from going to specific routs (protected routes) if they are not signed in.
*/
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Splash />
            </ProtectedRoute>
          }
        />
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
        <Route
          path="recipes"
          element={
            <ProtectedRoute>
              <RecipeSearch />
            </ProtectedRoute>
          }
        />
        <Route
          path="saverecipe"
          element={
            <ProtectedRoute>
              <SavedRecipe />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
