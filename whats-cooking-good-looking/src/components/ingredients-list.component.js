import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalStorage } from "../auth";
import AppNavBar from './AppNavBar.component.js';
import Card from "react-bootstrap/Card";
import CardHeader from 'react-bootstrap/esm/CardHeader';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import "../styles/ingredient-list.css";

// Prints out ingredients in organized way with delete and edit buttons. 
const Ingredient = props => (
    <tr>
        <td>{props.ingredients.category}</td>
        <td>{props.ingredients.quantity}</td>
        <td>{props.ingredients.name}</td>
        <td>{props.ingredients.expiration_date.substring(0, 10)}</td>
        <td>
            <Button variant="outline-info" onClick={() => { window.location = "/edit/" + props.ingredients._id }}>Edit</Button>
            <span className='seperate-buttons'></span>
            <Button variant="outline-danger" onClick={() => { props.deleteIngredient(props.ingredients._id) }}>Delete</Button>
        </td>
    </tr >
)

/*
FUNCTION/COMPONENT NAME
    IngredientsList - allows user to edit existing ingredient from their 
    "pantry" and updates the database

SYNOPSIS
    IngredientsList variables   
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

export default function IngredientsList(props) {
    // Grab curruser from local storage.
    const [user] = useLocalStorage("user", null);

    // Hook.
    const [ingredients, setIngredients] = useState([]);

    // Sets parameter to be the user id of the current user.
    const params = { uid: user.data.result._id };

    // Called as soon as the component runs.
    useEffect(() => {
        // Post request to server with parameter to grab the ingredients
        // the current user added.
        axios.post('http://localhost:8080/ingredients/', params)
            .then(response => {
                setIngredients(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    // Called if delete button is pressed.
    const deleteIngredient = (id) => {
        // Calls server to delete current ingredient.
        axios.delete('http://localhost:8080/ingredients/' + id)
            .then(res => console.log(res.data));

        setIngredients(ingredients.filter(el => el._id !== id));
    }


    // Grabs list of users ingredients.
    const ingredientList = () => {
        return ingredients.map(currentingredient => {
            return <Ingredient ingredients={currentingredient} deleteIngredient={deleteIngredient} key={currentingredient._id} />;
        })
    }

    return (
        // Creates a table.
        <div>
            <AppNavBar user={user.data.result.first_name + " " + user.data.result.last_name} />
            <Card className='card-wrapper'>
                <CardHeader className='header'>
                    <div className='header'>Your Pantry</div>
                </CardHeader>
                <Table className="table" striped hover>
                    <thead className="thead-light">
                        <tr>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Name</th>
                            <th>Expiration Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ingredientList()}
                    </tbody>
                </Table>
            </Card>

        </div>
    )
}

