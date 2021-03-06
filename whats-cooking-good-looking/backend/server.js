// Dependencies.
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

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
const userRouter = require('./routes/user');
const recipesRouter = require('./routes/recipes');
const ingredientsRouter = require('./routes/ingredients');
const affirmationsRouter = require('./routes/affirmations');

app.use('/user', userRouter);
app.use('/recipes', recipesRouter);
app.use('/ingredients', ingredientsRouter);
app.use('/affirmations', affirmationsRouter);

// Start Server on Port.
app.listen(port, () => {
    console.log('Server is running on port: 8080');
});