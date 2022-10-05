// Dependencies.
const router = require('express').Router();
const e = require('express');
const Recipes = require('../models/recipes.model');

// Routing Get Requests.
router.route('/').post((req, res) => {
  const obj = JSON.parse(JSON.stringify(req.body))
  Recipes.find({ user: obj.user })
    .then(recipe => res.json(recipe))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Routing Post Requests.
router.route('/saverecipe').post((req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const user = req.body.user;
  const image = req.body.image;

  const newRecipe = new Recipes({
    id,
    title,
    user,
    image,
  });

  Recipes.findOne({ id: id, user: user }).then(recipe => {
    if (recipe) {
      return res.status(405).json({
        errors: [{ recipe: "Recipe already saved." }],
      })
    }
    else {
      newRecipe.save()
        .then(() => res.json('Recipe added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    }
  });
});

// Delete Recipe
router.route('/:id').delete((req, res) => {
  Recipes.findByIdAndDelete(req.params.id)
    .then(() => res.json('Recipe deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;