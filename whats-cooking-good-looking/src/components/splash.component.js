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
    Splash - ranadomly generates a joke of the day

SYNOPSIS
    Splash variables   
        category --> the random joke                                                

DESCRIPTION
        This function is the home page of the app. This page consists
        of a random food joke of the day for the users enjoyment. You can 
        navigate to any section of the app through the navbar on this page.
*/

export default function Splash(props) {
    // Grab curruser from local storage.
    const [user] = useLocalStorage("user", null);

    // Sets parameter to be the user id of the current user.

    const [joke, setJoke] = useState('');


    const getJoke = () => {

        axios.get('https://api.humorapi.com/jokes/random/?api-key=aa6b6e8570ca402c859a512d9cb1c93a&include-tags=food,clean&exclude-tags=nsfw,racist,dark,religious,sexist,jewish,sexual,yo-momma,insults')
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

