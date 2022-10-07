import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalStorage } from "../auth";
import AppNavBar from './AppNavBar.component.js';
import Card from "react-bootstrap/Card";
import CardHeader from 'react-bootstrap/esm/CardHeader';
import Button from 'react-bootstrap/Button';
import "../styles/splash.css";
import Container from 'react-bootstrap/esm/Container';

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

export default function Splash(props) {
    // Grab curruser from local storage.
    const [user] = useLocalStorage("user", null);

    // Sets parameter to be the user id of the current user.

    const [joke, setJoke] = useState('');


    const getJoke = () => {

        axios.get('https://api.humorapi.com/jokes/random/?api-key=aa6b6e8570ca402c859a512d9cb1c93a&include-tags=food')
            .then(response => {
                setJoke(response.data.joke);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        getJoke();
    }, [])

    return (
        // Creates a table.
        <div>
            <AppNavBar user={user.data.result.first_name + " " + user.data.result.last_name} />
            <div className='card-wrapper'>
                <Card >
                    <CardHeader className='header'>
                        <div className='header'>Joke of the Day</div>
                    </CardHeader>
                    <Container className='spacing'>
                        <div>{joke}</div>
                    </Container>

                    <Container className='button-container'>
                        <Button type='button' variant="outline-success" className="button" onClick={() => getJoke()}>
                            Another Joke Please!
                        </Button>
                    </Container>


                </Card>
            </div>


        </div>
    )
}

