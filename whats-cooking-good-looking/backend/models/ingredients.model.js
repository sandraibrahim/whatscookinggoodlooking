// Dependencies.
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema.
const ingredientsSchema = new Schema({
    category: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true },
    name: { type: String, required: true, unique: true, trim: true },
    expiration_date: { type: Date, required: true },
    uid: { type: String, required: true }
}, {
    timestamps: true,
});

const Ingredients = mongoose.model('Ingredients', ingredientsSchema);
module.exports = Ingredients;