import React, {Component} from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    // Constructor
    constructor(props){
        super(props);

        // binds the current variable with the 'this' variable
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        // set default values
        this.state = {
            username : '',
            password : '',
            email : '',
            first_name : '',
            last_name : ''
        }
    }

    // When on change is called, sets to the value needed (setter)
    onChangeUsername(e){
        this.setState({
            username : e.target.value
        })
    }

    onChangePassword(e){
        this.setState({
            password : e.target.value
        })
    }

    onChangeEmail(e){
        this.setState({
            email : e.target.value
        })
    }

    onChangeFirstName(e){
        this.setState({
            first_name : e.target.value
        })
    }

    onChangeLastName(e){
        this.setState({
            last_name : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        // create a user object
        const user = {
            username : this.state.username,
            password : this.state.password,
            email : this.state.email,
            first_name : this.state.first_name,
            last_name : this.state.last_name
        }

        console.log(user);

        // send the user object to the server/backend to save it
        axios.post('http://localhost:8080/user/signup', user)
        .then(res => console.log(res.data));

        // reset state
        this.setState({
            username : '',
            password : '',
            email : '',
            first_name : '',
            last_name : ''
        })
    }
    
    render(){
        return(
            // Create a form
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                    <label>Username: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        />
                </div>
                <div className="form-group"> 
                    <label>Password: </label>
                    <input  type="password"
                        required
                        className="form-control"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        />
                </div>
                <div className="form-group"> 
                    <label>Email: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        />
                </div>
                <div className="form-group"> 
                    <label>First Name: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.first_name}
                        onChange={this.onChangeFirstName}
                        />
                </div>
                <div className="form-group"> 
                    <label>Last Name: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.last_name}
                        onChange={this.onChangeLastName}
                        />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
                </form>
            </div>
        )
    }
}