import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

let options = [
  {label: 'Fruit', value: 'Fruit'},
  {label: 'Vegetables', value: 'Vegetables'},
  {label: 'Dairy', value: 'Dairy'},
  {label: 'Meat', value: 'Meat'},
  {label: 'Condiment', value: 'Condiment'},
  {label: 'Seafood', value: 'Seafood'},
  {label: 'Herbs/Spices', value: 'Herbs/Spices'},
  {label: 'Baking', value: 'Baking'},
  {label: 'Oils/Fats', value: 'Oils/Fats'},
  {label: 'Beverages', value: 'Beverages'},
  {label: 'Pasta', value: 'Pasta'},
  {label: 'Bread', value: 'Bread'},
  {label: 'Other', value: 'Other'},
]

export default class EditIngredients extends Component {
  constructor(props) {
    super(props);

    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeExpirationDate = this.onChangeExpirationDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      category : '',
      quantity: 0,
      name: '',
      expiration_date: new Date(),
    }
  }

  componentDidMount() {
    // ERROR HERE
    axios.get('http://localhost:8080/ingredients/'+ this.props.match.params.id)
      .then(response => {
        this.setState({
          category : response.data.category,
          quantity: response.data.quantity,
          name: response.data.name,
          expiration_date: new Date(response.data.expiration_date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

  }
  
  // Setters

  onChangeCategory(e){
    this.setState({
        category : e.target.value
    })
  }

  onChangeQuantity(e) {
      this.setState({
          quantity: e.target.value
      })
      }

  onChangeName(e) {
      this.setState({
          name: e.target.value
      })
      }

  onChangeExpirationDate(date) {
      this.setState({
          expiration_date: date
      })
  }

  onSubmit(e){
    e.preventDefault();

    // creates ingredient object
    const ingredient = {
        category: this.state.category,
        quantity: this.state.quantity,
        name: this.state.name,
        expiration_date: this.state.expiration_date
    }

    console.log(ingredient);

    // sends object to get added in server
    axios.post('http://localhost:8080/ingredients/update/'+this.props.match.params.id, ingredient)
    .then(res => console.log(res.data));
    
  }

  render() {
    return (
    // Creates a form
    <div>
      <h3>Edit Ingredient List</h3>
      <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
          <label>Category: </label>
          <select
              required
              className="form-control"
              value={this.state.category}
              // Lists Categories
              onChange={this.onChangeCategory}>
              {
                  options.map(function(option) {
                  return <option 
                      value={option.value}>{option.label}
                      </option>;
                  })
              }
          </select>
          </div>

          <div className="form-group"> 
          <label>Quantity: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.quantity}
              onChange={this.onChangeQuantity}
              />
          </div>

          <div className="form-group"> 
          <label>Ingredient Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
              />
          </div>
          
          <div className="form-group">
          <label>Expiration Date: </label>
          <div>
              <DatePicker
              selected={this.state.expiration_date}
              onChange={this.onChangeExpirationDate}
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
}