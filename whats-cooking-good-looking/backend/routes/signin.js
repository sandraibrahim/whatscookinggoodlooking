// Dependencies.
const router = require("express").Router();
let User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createJWT } = require("../utils/auth");

// Routing Get Requests.
router.route("/").get((req, res) => {
    User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json("Error: " + err));
});

// Routing Post Requests.
router.route("/").post((req, res) => {
    // Get the username and password.
    let { username, password } = req.body;

    let errors = [];
    if (!username) {
        errors.push({ username: "Username is required." });
    }
    if (!password) {
        errors.push({ passowrd: "Password is required." });
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }

    // Find if username exists in database.
    User.findOne({ username: username })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    errors: [{ user: "User not found :((" }],
                });
            } else {
                // Found user, compare hashed password.
                bcrypt
                    .compare(password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            return res
                                .status(400)
                                .json({ errors: [{ password: "Wrong Credentials bro" }] });
                        }

                        // Build Access Token.
                        let access_token = createJWT(user.username, user._id, 3600);

                        // Verify Token Integrity.
                        jwt.verify(
                            access_token,
                            process.env.JWT_KEY,
                            (err, valid_jwt) => {
                                if (err) {
                                    res.status(500).json({ errors: err });
                                }
                                if (valid_jwt) {
                                    return res.status(200).json({
                                        success: true,
                                        token: access_token,
                                        message: user,
                                    });
                                }
                            }
                        );
                    })
                    .catch((err) => {
                        res.status(500).json({ errors: err });
                    });
            }
        })
        .catch((err) => {
            res.status(500).json({ errors: err });
        });
});

module.exports = router;
