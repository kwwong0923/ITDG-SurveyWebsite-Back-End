const express = require("express");
const router = express.Router();
const passport = require("passport");

const authController = require("../controllers/auth.server.controller");

router.post("/login", passport.authenticate("local",
{
    failureRedirect: '/login', 
    failureMessage: true
}),
(req, res) =>
{
    console.log("SUCCESSFUL LOGIN");
    res.send(
        {
            msg: `SUCCESSFUL LOGIN`,
        }
    )
});

router.post("/signup", authController.processSignUpPage);


module.exports = router;