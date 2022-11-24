const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.server.model");
const bcrypt = require("bcrypt");

// local signup function
module.exports.processSignUpPage = async (req, res) =>
{
    let {displayName, email, password} = req.body;
    // check password length
    if(password.length < 8)
    {
        console.log("ERROR - PASSWORD IS LESS THAN 8");
        return res.status(400).send("ERROR - PASSWORD IS LESS THAN 8");
    }
    // check email does it register before
    let foundEmail = await User.findOne({email});
    if (foundEmail)
    {
        console.log("ERROR - EMAIL HAVE BEEN REGISTERED");
        return res.status(400).send("ERROR - EMAIL HAVE BEEN REGISTERED");
    }
    // everything OK!
    let hashedPassword = await bcrypt.hash(password, 12);
    let newUser = new User
    (
        {displayName, email, password: hashedPassword}
    );
    await newUser.save();
    console.log("SUCCESSFUL REGISTRATION");
    return res.send(
        {
            msg: `SUCCESSFUL REGISTRATION, EMAIL:${email}`,
            newUserObj: newUser
        }
    )
};

//login function
module.exports.processLoginPage = passport.authenticate("local",
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
};