import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalStorage } from "../auth";
import AppNavBar from './AppNavBar.component';
import Card from "react-bootstrap/Card";
import CardHeader from 'react-bootstrap/esm/CardHeader';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import "../styles/saved_recipes.css";

const openUrlWithID = id => {
    let payload = {
        apiKey: "004c4138b95749f6aeb59289bc2e58e8",
        includeNutrition: false
    }
    axios.get(`https://api.spoonacular.com/recipes/${id}/information`, { params: payload })
        .then(response => {
            window.open(response.data.sourceUrl);
        })
        .catch(function (error) {
            console.log(error);
            window.alert("Cannot Get Recipe")
        })
}

// Prints out Recipes in organized way with delete and edit buttons. 
const Recipe = props => (
    <tr>
        <td>
            <img
                src={props.recipes.image}
                alt={`${props.recipes.title}`}
                width="200px"
                height="200px"
            />
        </td>
        <td>{props.recipes.title}</td>
        <td>
            <Button variant="outline-primary" onClick={() => openUrlWithID(props.recipes.id)}>
                See Recipe
            </Button>
            <span className='seperate-buttons'></span>
            <Button variant="outline-danger" onClick={() => { props.deleteRecipe(props.recipes._id) }}>
                Delete
            </Button>
        </td>

    </tr>
)

/*
FUNCTION/COMPONENT NAME
    RecipesList - allows user to edit existing ingredient from their 
    "pantry" and updates the database

SYNOPSIS
    RecipesList variables   
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

export default function SavedRecipe(props) {
    // Grab curruser from local storage.
    const [user] = useLocalStorage("user", null);

    // Hook.
    const [recipes, setRecipes] = useState([]);

    // Sets parameter to be the user id of the current user.
    const params = { user: user.data.result._id };

    // Called as soon as the component runs.
    useEffect(() => {
        // Post request to server with parameter to grab the recipes
        // the current user saved.
        axios.post('http://localhost:8080/recipes/', params)
            .then(response => {
                setRecipes(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    // Called if delete button is pressed.
    const deleteRecipe = (id) => {
        // Calls server to delete current ingredient.
        axios.delete('http://localhost:8080/recipes/' + id)
            .then(res => console.log(res.data));

        setRecipes(recipes.filter(el => el._id !== id));
    }

    // Grabs list of users Recipes.
    const recipeList = () => {
        return recipes.map(currentrecipe => {
            return <Recipe recipes={currentrecipe} deleteRecipe={deleteRecipe} key={currentrecipe._id} />;
        })
    }

    return (
        // Creates a table.
        <div>
            <AppNavBar user={user.data.result.first_name + " " + user.data.result.last_name} />
            <Card className='card-wrapper'>
                <CardHeader className='header'>
                    <div className='header'>Your Favorite Recipes</div>
                </CardHeader>
                <Table className="table" striped hover>
                    <thead className="thead-light">
                        <tr>
                            <th>Sneak Peak</th>
                            <th>Recipe Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipeList()}
                    </tbody>
                </Table>
            </Card>
        </div >

    )
}
