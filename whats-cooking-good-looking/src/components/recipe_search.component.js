import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLocalStorage } from "../auth";
import AppNavBar from './AppNavBar.component.js';
import Card from "react-bootstrap/Card";
import CardHeader from 'react-bootstrap/esm/CardHeader';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import "../styles/recipe_search.css";

// Prints out ingredients in organized way with delete and edit buttons. 
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
            window.alert("Cannot Get Recipe")
        })
}

const Recipe = props => (
    <tr>
        <td>
            <img
                src={props.recipe.image}
                alt={`${props.recipe.title}`}
                width="200px"
                height="200px"
            />
        </td>

        <td>{props.recipe.title}</td>
        <td>
            <Button variant="outline-primary" onClick={() => openUrlWithID(props.recipe.id)}>
                See Recipe
            </Button>
            <span className='seperate-buttons'></span>
            <Button variant="outline-dark" onClick={() => props.saverecipe(props.recipe.title, props.recipe.image, props.recipe.id)}>
                Save Recipe
            </Button>

        </td>

    </tr>
)



/*
FUNCTION/COMPONENT NAME
    RecipeSearch - shows a list of recipes using the users pantry 
    ingredients

SYNOPSIS
    RecipeSearch variables   
        recipes --> list of recipes found                                                 

DESCRIPTION
        This function takes care of searching for recipes based on
        your pantry. As soon as you navigate to this page, it automatically
        lists out all of the recipes that were found (through the Spoonacular API).
        You are able to see the recipe and save the recipe from this page.
*/

export default function RecipeSearch(props) {
    const [user] = useLocalStorage("user", null);
    const params = { uid: user.data.result._id };
    let ingredientlist = "";
    const [show, setShow] = useState(false);
    const toggleShow = () => setShow(!show);
    const [alert_message, setAlert] = useState('');

    // Hook.
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:8080/ingredients/', params)
            .then(response => {
                // TODO: Error Check Response

                response.data.forEach((ingredient) => {
                    ingredientlist += ingredient.name + ',';
                })
                let payload = {
                    apiKey: "004c4138b95749f6aeb59289bc2e58e8",
                    ingredients: ingredientlist
                }
                axios.get('https://api.spoonacular.com/recipes/findByIngredients', { params: payload })
                    .then(response => {
                        setRecipes(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
    }, [])

    // Called if delete button is pressed.
    const saverecipe = (title, image, id) => {
        const recipe = {
            id: id,
            title: title,
            user: user.data.result._id,
            image: image
        }

        // Calls server to delete current ingredient.
        axios.post('http://localhost:8080/recipes/saverecipe', recipe)
            .then(res => {
                setAlert("Recipe Saved!");
                toggleShow();
            })
            .catch(function (error) {
                if (error.response.status === 405) {
                    setAlert("Recipe already saved!");
                    toggleShow();
                }
                else {
                    setAlert("Something went wrong. Please try again.");
                    toggleShow();
                }
            });

        setRecipes(recipes.filter(el => el._id !== id));
    }

    // Grabs list of users recipes.
    const recipesList = () => {
        return recipes.map(currrecipe => {
            return <Recipe recipe={currrecipe} saverecipe={saverecipe} key={currrecipe.id} />;
        })
    }

    return (
        <div>
            <AppNavBar user={user.data.result.first_name + " " + user.data.result.last_name} />
            <Card className='card-wrapper'>
                <Container className="save-container">
                    <Alert show={show} variant="success" className='save-alert' onClose={() => setShow(false)} dismissible>
                        <p>{alert_message}</p>
                        <div className="d-flex justify-content-end">
                        </div>
                    </Alert>
                </Container>

                <CardHeader className='header'>
                    <div className='header'>Recipes Found</div>
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
                        {recipesList()}
                    </tbody>
                </Table>
            </Card>

        </div>
    )
}

