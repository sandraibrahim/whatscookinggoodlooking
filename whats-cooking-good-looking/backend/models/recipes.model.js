// Dependencies.
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema.
const recipesSchema = new Schema({
    link:{type: String, required: true, trim: true},
    title:{type: String, required: true},
    username:{type: String, required: true, trim: true},
    type:{type: String, required: true},
},{
    timestamps: true,
});

const Recipes = mongoose.model('Recipes', recipesSchema);
module.exports = Recipes;