import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Ingredient = props => (
    <tr>
        <td>{props.ingredients.category}</td>
        <td>{props.ingredients.quantity}</td>
        <td>{props.ingredients.name}</td>
        <td>{props.ingredients.expiration_date.substring(0,10)}</td>
        <td>
            {/* ERROR HERE */}
            <Link 
                to={"/edit/"+props.ingredients._id}
                others = {props} 
            >
                    Edit
            </Link> | 
            <a href="#" onClick={() => { props.deleteIngredient(props.ingredients._id) }}>Delete</a>
        </td>
    </tr>
)

export default class IngredientsList extends Component {
    constructor(props){
        super(props);

        this.deleteIngredient = this.deleteIngredient.bind(this);

        this.state = {ingredeints : []};
    }

    componentDidMount(){
        axios.get('http://localhost:8080/ingredients/')
        .then(response => {
            this.setState({ingredeints: response.data})
        })
        .catch((error) => {
            console.log(error);
        })
    }

    deleteIngredient(id) {
        axios.delete('http://localhost:8080/ingredients/'+id)
        .then (res => console.log(res.data));

        this.setState({
            ingredients: this.state.ingredients.filter(el => el._id !== id)
        })
    }

    ingredeintList(){
        return this.state.ingredeints.map(currentingredient => {
            return <Ingredient ingredients = {currentingredient} deleteIngredient={this.deleteIngredient} key={currentingredient._id}/>;
        })
    }
    render(){
        return(
            <div>
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
                    { this.ingredeintList() }
                </tbody>
                </table>
            </div>
        )
    }
}