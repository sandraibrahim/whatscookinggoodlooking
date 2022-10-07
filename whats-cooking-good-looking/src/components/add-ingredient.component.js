import React, { useState } from 'react';
import axios from 'axios';
import AppNavBar from './AppNavBar.component.js';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from "../auth";
import "react-datepicker/dist/react-datepicker.css";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../styles/addingredient.css";
import FormGroup from 'react-bootstrap/esm/FormGroup';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import InputGroup from 'react-bootstrap/InputGroup';

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
        user --> user that added ingredient
        options --> list of category options                                                   

DESCRIPTION
        This function takes care of creating a form for the user to fill out
        to add ingredients into their pantry. When they fill out the form
        with all of the required fields it will call the server to then add 
        the information to the database.
*/

export default function AddIngredient() {
    // Allows window to navigate to different pages on app .
    let navigate = useNavigate();

    // Grab curruser from local storage.
    const [user] = useLocalStorage("user", null);

    // Hooks.
    const [name, setName] = useState();
    const [quantity, setQuantity] = useState();
    const [category, setCategory] = useState();
    const [expiration, setExpiration] = useState();

    // List of Category Options.
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

    // Called when submit button is pressed.
    const handleSubmit = async e => {
        e.preventDefault();

        // Creates ingredient object.
        const ingredient = {
            category: category,
            quantity: quantity,
            name: name,
            expiration_date: expiration,
            uid: user.data.result._id
        }

        // Sends object to get added in server.
        axios.post('http://localhost:8080/ingredients/addingredient', ingredient)
            .then(res => navigate("/ingredients"));

    }

    return (
        // Creates a form.
        <div>
            <AppNavBar user={user.data.result.first_name + " " + user.data.result.last_name} />
            <Card className='card-wrapper'>
                <CardHeader className='header'>
                    <div className='header'>Add New Ingredient</div>
                </CardHeader>
                <Form onSubmit={handleSubmit}>
                    <div className="input-divider">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Category</InputGroup.Text>
                            <Form.Select
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
                            </Form.Select>
                        </InputGroup>
                    </div>
                    <div className="input-divider">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Ingredient Name</InputGroup.Text>
                            <Form.Control type="text" required placeholder="ex. apple" value={name} onChange={(e) => setName(e.target.value)} />
                        </InputGroup>
                    </div>
                    <div className="input-divider">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Quantity</InputGroup.Text>
                            <Form.Control type="text" required placeholder="ex. 1" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                        </InputGroup>
                    </div>
                    <div className="input-divider">
                        <InputGroup>
                            <InputGroup.Text id="basic-addon1">Expiration Date</InputGroup.Text>
                            <Form.Control type="date" placeholder='Please select a date' onChange={(date) => setExpiration(date.target.value)} />
                        </InputGroup>

                    </div>
                    <FormGroup>
                        <div className='input-divider'>
                            <Button variant="outline-success" type="submit" value="Add Ingredient">Add Ingredient!</Button>
                        </div>
                    </FormGroup>

                </Form>
            </Card>
        </div>
    )
}