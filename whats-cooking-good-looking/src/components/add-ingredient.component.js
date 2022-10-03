import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import Navbar from './navbar.component';
import { useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";

let options = [
    { label: 'Choose Category', value: '' },
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

/*
FUNCTION/COMPONENT NAME
    AddIngredient - allows user to add ingredient to their "pantry" 
    and adds to data base

SYNOPSIS
    AddIngredient variables   
        category --> category/type of ingredeient
        quantity --> amount of ingredeient
        name --> name of ingredient
        expiration_date --> expiration date of ingredient                                                        

DESCRIPTION

        This class takes care of creating a form for the user to fill out
        to add ingredients into their pantry. When they fill out the form
        with all of the required fields it will call the server to then add 
        the information to the database.
*/

export default function AddIngredient({ setJWT }) {
    let navigate = useNavigate();
    const [name, setName] = useState();
    const [quantity, setQuantity] = useState();
    const [category, setCategory] = useState();
    const [expiration, setExpiration] = useState();

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

        // Sends object to get added in server.
        axios.post('http://localhost:8080/ingredients/addingredient', ingredient)
            .then(res => navigate("/ingredients"));

    }

    return (
        // Creates a form.
        <div>
            <Navbar />
            <h3>Add New Ingredient</h3>
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
                    <input type="submit" value="Add Ingredient" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}