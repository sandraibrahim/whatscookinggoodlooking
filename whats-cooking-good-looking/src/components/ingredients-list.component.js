import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLocalStorage } from "../auth";
import Navbar from './navbar.component';

const Ingredient = props => (
    <tr>
        <td>{props.ingredients.category}</td>
        <td>{props.ingredients.quantity}</td>
        <td>{props.ingredients.name}</td>
        <td>{props.ingredients.expiration_date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/" + props.ingredients._id}> Edit </Link>
            |
            <button onClick={() => { props.deleteIngredient(props.ingredients._id) }}>Delete</button>
        </td>
    </tr>
)

export default function IngredientsList(props) {
    const [ingredients, setIngredients] = useState([]);
    const [user] = useLocalStorage("user", null);
    const params = { uid: user.data.message._id };
    useEffect(() => {
        axios.post('http://localhost:8080/ingredients/', params)
            .then(response => {
                setIngredients(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])


    const deleteIngredient = (id) => {
        axios.delete('http://localhost:8080/ingredients/' + id)
            .then(res => console.log(res.data));

        setIngredients(ingredients.filter(el => el._id !== id));
    }

    const ingredientList = () => {
        return ingredients.map(currentingredient => {
            return <Ingredient ingredients={currentingredient} deleteIngredient={deleteIngredient} key={currentingredient._id} />;
        })
    }

    return (
        <div>
            <Navbar />
            <h3>Your Ingredients</h3>
            <table className="table">
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
            </table>
        </div>
    )
}

