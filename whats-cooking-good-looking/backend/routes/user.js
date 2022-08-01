// Dependencies.
const router = require('express').Router();
let User = require('../models/user.model');

// Routing Get Requests.
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Routing Post Requests.
router.route('/signup').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;

  const newUser = new User({
      username,
      password,
      email,
      first_name,
      last_name,
    });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;