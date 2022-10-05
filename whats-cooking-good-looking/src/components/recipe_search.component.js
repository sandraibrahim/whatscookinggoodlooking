import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLocalStorage } from "../auth";
import AppNavBar from './AppNavBar.component.js';

// import IngredientsList from './ingredients-list.component';

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
        <td>{props.recipe.title}</td>
        <img
            src={props.recipe.image}
            alt={`${props.recipe.title}`}
        />
        <button onClick={() => openUrlWithID(props.recipe.id)}>
            See Recipe
        </button>
        <button onClick={() => props.saverecipe(props.recipe.title, props.recipe.image, props.recipe.id)}>
            Save Recipe
        </button>
    </tr>
)

export default function RecipeSearch(props) {
    const [user] = useLocalStorage("user", null);
    const params = { uid: user.data.result._id };
    let ingredientlist = "";

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
                        // console.log(response);
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
            user: user.data.message._id,
            image: image
        }

        // Calls server to delete current ingredient.
        axios.post('http://localhost:8080/recipes/saverecipe', recipe)
            .then(res => console.log(res.data))
            .catch(function (error) {
                if (error.response.status === 405) {
                    console.log("Recipe already saved!")
                }
                else {
                    console.log("Something went wrong. Please try again.")
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
            <h3>Your Recipes</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Recipe Name</th>
                    </tr>
                </thead>
                <tbody>
                    {recipesList()}
                </tbody>
            </table>
        </div>
    )
}

