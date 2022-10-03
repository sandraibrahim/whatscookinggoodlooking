// Dependencies.
const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
  createJWT,
} = require("../utils/auth");

// Routing Get Requests.
router.route('/').get((req, res) => {

});

// Routing Post Requests.
router.route('/').post((req, res, next) => {
  // Get the credentials.
  let { username, password, email, first_name, last_name } = req.body;

  let errors = [];
  if (!username) {
    errors.push({ username: "Username is required." });
  }
  if (!email) {
    errors.push({ email: "Email is required." });
  }
  if (!password) {
    errors.push({ passowrd: "Password is required." });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }

  // Find if email exists in database.
  User.findOne({ email: email }).then(user => {
    if (user) {
      return res.status(400).json({
        errors: [{ user: "Email already exists. Try signing in." }],
      });
      // Create a new user
    } else {
      const user = new User({
        username: username,
        password: password,
        email: email,
        first_name: first_name,
        last_name: last_name,
      });

      // Hash the password
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) throw err;
          user.password = hash;
          user.save()
            .then(response => {
              res.status(200).json({
                success: true,
                result: response
              })
            })
            .catch(err => {
              res.status(500).json({
                errors: [{ error: err }]
              });
            });
        });
      });
    }
  }).catch(err => {
    res.status(500).json({
      errors: [{ error: 'Something went wrong' }]
    });
  })

});

module.exports = router;