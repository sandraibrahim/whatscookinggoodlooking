// Dependencies.
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema.
const affirmationsSchema = new Schema({
    quote:{type: String, required: true, unique: true, trim: true},
},{
    timestamps: true,
});

const Affirmations = mongoose.model('Affirmations', affirmationsSchema);
module.exports = Affirmations;