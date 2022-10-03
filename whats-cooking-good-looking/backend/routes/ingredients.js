// Dependencies.
const router = require('express').Router();
const Ingredients = require('../models/ingredients.model');

// Routing Get Requests.
router.route('/').get((req, res) => {
  Ingredients.find()
    .then(ingredient => res.json(ingredient))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get Specific Ingredient.
router.route('/:id').get((req, res) => {
  Ingredients.findById(req.params.id)
    .then(ingredient => res.json(ingredient))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Routing Post Requests.
router.route('/addingredient').post((req, res) => {
  const category = req.body.category;
  const quantity = req.body.quantity;
  const name = req.body.name;
  const expiration_date = req.body.expiration_date;

  const newIngredients = new Ingredients({
    category,
    quantity,
    name,
    expiration_date,
  });

  newIngredients.save()
    .then(() => res.json('Ingredient added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE
router.route('/:id').delete((req, res) => {
  Ingredients.findByIdAndDelete(req.params.id)
    .then(() => res.json('Ingredient deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// UPDATE
router.route('/edit/:id').post((req, res) => {
  Ingredients.findById(req.params.id)
    .then(ingredient => {
      ingredient.category = req.body.category;
      ingredient.quantity = Number(req.body.quantity);
      ingredient.name = req.body.name;
      ingredient.expiration_date = Date.parse(req.body.expiration_date);

      ingredient.save()
        .then(() => res.json('Ingredient updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;