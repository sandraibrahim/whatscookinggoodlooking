import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import Navbar from './navbar.component';
import { useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";

/*
FUNCTION/COMPONENT NAME
    EditIngredients - allows user to edit existing ingredient from their 
    "pantry" and updates the database

SYNOPSIS
    EditIngredients variables   
        category --> category/type of ingredeient
        quantity --> amount of ingredeient
        name --> name of ingredient
        expiration_date --> expiration date of ingredient     
        options --> list of category options                                                   

DESCRIPTION
        This function takes care of creating a form and filling it in with
        the existing values of the ingredient they would like to edit/update.
        When they edit the form with their updates it will call the server to then 
        update the information in the database. 
*/

export default function EditIngredients(props) {
  // Allows window to navigate to different pages on app .
  let navigate = useNavigate();

  // Hooks.
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [expiration, setExpiration] = useState("");

  // List of Category Options.
  let options = [
    { label: 'Fruit', value: 'Fruit' },
    { label: 'Vegetables', value: 'Vegetables' },
    { label: 'Dairy', value: 'Dairy' },
    { label: 'Meat', value: 'Meat' },
    { label: 'Condiment', value: 'Condiment' },
    { label: 'Seafood', value: 'Seafood' },
    { label: 'Herbs/Spices', value: 'Herbs/Spices' },
    { label: 'Baking', value: 'Baking' },
    { label: 'Oils/Fats', value: 'Oils/Fats' },
    { label: 'Beverages', value: 'Beverages' },
    { label: 'Pasta', value: 'Pasta' },
    { label: 'Bread', value: 'Bread' },
    { label: 'Other', value: 'Other' },
  ]

  // Called as soon as the component runs.
  useEffect(() => {
    // Grabs the unique ingredient id from URL.
    const id = window.location.href.split('/')[4]

    // Get request to server with id to get current ingredient info 
    // to auto fill form.
    axios.get('http://localhost:8080/ingredients/' + id)
      .then(response => {
        setCategory(response.data.category);
        setQuantity(response.data.quantity);
        setName(response.data.name);
        setExpiration(new Date(response.data.expiration_date));
      })
      .catch(function (error) {
        console.log(error);
      })

  }, [])

  // Called when submit button is pressed.
  const handleSubmit = async e => {
    e.preventDefault();

    // Creates ingredient object.
    const ingredient = {
      category: category,
      quantity: quantity,
      name: name,
      expiration_date: expiration
    }

    // Grabs the unique ingredient id from URL.
    const id = window.location.href.split('/')[4]

    // Get request to server with id. Updates the new information and redirects page.
    axios.post('http://localhost:8080/ingredients/edit/' + id, ingredient)
      .then(res => navigate("/ingredients"));

  }

  return (
    // Creates a form.
    <div>
      <Navbar />
      <h3>Edit Ingredient List</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Category: </label>
          <select
            required
            className="form-control"
            value={category}

            // Lists Categories
            onChange={(e) => setCategory(e.target.value)}>
            {
              options.map(function (option) {
                return <option
                  value={option.value} key={option.value}>{option.label}
                </option>;
              })
            }
          </select>
        </div>

        <div className="form-group">
          <label>Quantity: </label>
          <input type="text"
            required
            className="form-control"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Ingredient Name: </label>
          <input type="text"
            required
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Expiration Date: </label>
          <div>
            <DatePicker
              selected={expiration}
              onChange={(date) => setExpiration(date)}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Ingredient" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )

}



