// Dependencies.
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema.
const recipesSchema = new Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    user: { type: String, required: true, trim: true },
    image: { type: String, required: true }
}, {
    timestamps: true,
});

const Recipes = mongoose.model('Recipes', recipesSchema);
module.exports = Recipes;