// Dependencies.
const router = require('express').Router();
const Ingredients = require('../models/ingredients.model');

// Routing Get Requests.
router.route('/').get((req, res) => {
  Ingredients.find()
    .then(ingredient => res.json(ingredient))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Routing Post Requests.
router.route('/addingredient').post((req, res) => {
  const category = req.body.category;
  const quantity = Number(req.body.quantity);
  const name = req.body.name;
  const username = req.body.username;
  const expiration_date = Date.parse(req.body.expiration_date);

  const newIngredients = new Ingredients({
      category,
      quantity,
      name,
      username,
      expiration_date,
    });

  newIngredient.save()
    .then(() => res.json('Ingredient added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE
router.route('/:id').delete((req, res) => {
  Ingredients.findByIdAndDelete(req.params.id)
    .then(() => res.json('Ingredient deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;