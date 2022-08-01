// Dependencies.
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema.
const userSchema = new Schema({
    username:{type: String, required: true, unique: true, trim: true},
    password:{type: String, required: true},
    email:{type: String, required: true, unique: true, trim: true},
    first_name:{type: String, required: true},
    last_name:{type: String, required: true},
},{
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;