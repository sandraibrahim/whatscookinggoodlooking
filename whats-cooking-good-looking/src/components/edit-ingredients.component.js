import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import Navbar from './navbar.component';
import { useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";

let options = [
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

export default function EditIngredients(props) {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [expiration, setExpiration] = useState("");

  useEffect(() => {
    const id = window.location.href.split('/')[4]
    axios.get('http://localhost:8080/ingredients/' + id)
      .then(response => {
        setCategory(response.data.category);
        setQuantity(response.data.quantity);
        setName(response.data.name);
        setExpiration(new Date(response.data.expiration_date));
      })
      .catch(function (error) {
        console.log(error);
      })

  }, [])

  const handleSubmit = async e => {
    e.preventDefault();
    // creates ingredient object
    const ingredient = {
      category: category,
      quantity: quantity,
      name: name,
      expiration_date: expiration
    }

    const id = window.location.href.split('/')[4]

    // sends object to get added in server
    axios.post('http://localhost:8080/ingredients/edit/' + id, ingredient)
      .then(res => navigate("/ingredients"));

  }

  return (
    // Creates a form
    <div>
      <Navbar />
      <h3>Edit Ingredient List</h3>
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
          <input type="submit" value="Edit Ingredient" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )

}

// export default (props) => (
//   <EditIngredients
//     {...props}
//     params={useParams()}
//   />
// )

