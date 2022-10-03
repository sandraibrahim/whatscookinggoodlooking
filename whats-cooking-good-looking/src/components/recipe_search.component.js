import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLocalStorage } from "../auth";
import Navbar from './navbar.component';
import IngredientsList from './ingredients-list.component';

export default function RecipeSearch(props) {
    const [ingredients, setIngredients] = useState([]);
    const [user] = useLocalStorage("user", null);
    const params = { uid: user.data.message._id };
    let ingredientlist = "";


    useEffect(() => {
        axios.post('http://localhost:8080/ingredients/', params)
            .then(response => {
                setIngredients(response.data);
            })
            .then(response => {
                createList();
                const payload = {
                    apiKey: "004c4138b95749f6aeb59289bc2e58e8",
                    includeIngredients: ingredientlist
                }
                return payload;
            })
            .then(payload => {
                axios.get('https://api.spoonacular.com/recipes/complexSearch', { payload })
                    .then(response => {
                        console.log(response);
                    })
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const createList = () => {
        ingredients.forEach((ingredient) => {
            ingredientlist += ingredient.name + ' ,';
        })
    }




    return (
        <div>
            <Navbar />

        </div>
    )
}

