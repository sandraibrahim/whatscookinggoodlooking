// Dependencies.
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

// Setting up basic middleware for all Express requests.
// Parses urlencoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Send JSON responses
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Mongoose/Atlas Connection.
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// Routing.
const recipesRouter = require('./routes/recipes');
const ingredientsRouter = require('./routes/ingredients');
const signinRouter = require('./routes/signin');
const signupRouter = require('./routes/signup');
const splashRouter = require('./routes/splash');

app.use('/signin', signinRouter);
app.use('/signup', signupRouter);
app.use('/recipes', recipesRouter);
app.use('/ingredients', ingredientsRouter);
app.use('/splash', splashRouter);


// Start Server on Port.
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});