// Dependencies.
const router = require('express').Router();
const Recipes = require('../models/recipes.model');

// Routing Get Requests.
router.route('/').get((req, res) => {
  Recipes.find()
    .then(recipe => res.json(recipe))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Routing Post Requests.
router.route('/saverecipe').post((req, res) => {
  const link = req.body.link;
  const title = req.body.title;
  const username = req.body.username;
  const type = req.body.type;

  const newRecipe = new Recipes({
    link,
    title,
    username,
    type,
  });

  newRecipe.save()
    .then(() => res.json('Recipe added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete Recipe
router.route('/:id').delete((req, res) => {
  Recipes.findByIdAndDelete(req.params.id)
    .then(() => res.json('Recipe deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});







module.exports = router;