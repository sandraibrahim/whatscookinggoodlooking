// Dependencies.
const router = require('express').Router();
const Affirmations = require('../models/affirmations.model');

// Routing Get Requests.
router.route('/').get((req, res) => {
    Affirmations.find()
    .then(affirmation => res.json(affirmation))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Routing Post Requests.
// router.route('/add').post((req, res) => {
//   const quote = req.body.quote;
  
//   const newAffirmation = new Affirmations({
//       quote,
//     });

//   newAffirmation.save()
//     .then(() => res.json('Affirmation added!'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;