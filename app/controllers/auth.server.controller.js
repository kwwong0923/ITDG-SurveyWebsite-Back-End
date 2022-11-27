const passport = require("passport");
const User = require("../models/user.server.model");
// const bcrypt = require("bcrypt");
const {generatePassword } = require("../../config/passwordAuth.server.config");

module.exports.logoutUser = (req, res) =>
{
    req.logout();
    res.json("logged out");
}

module.exports.loginUser = (req, res) =>
{
    passport.authenticate("local",
    {
        failureMessage: "Could not Authenticated",
        SuccessfullyMessage: "Successfully Authenticated User"
    });

    console.log("login OK")
    return res.status(200).json(
        {
            user: req.body.user
        }
    )
};

module.exports.signupUser = (req, res) =>
{
    console.log("HERE");
    try
    {
        const saltHashObj = generatePassword(req.body.password);
        const salt = saltHashObj.salt;
        const hash = saltHashObj.hash;
        const newUser = new User(
            {
                username: req.body.username,
                displayName: req.body.displayName,
                email: req.body.email,
                salt: salt,
                hash: hash,
            }
        );
    
        newUser.save()
                .then((user) =>
                {
                    console.log(`userUser.save() OK`);
                    console.log(`New User save: ${user}`);
                });
    
        res.json("Registered User Successfully");
    }
    catch(error)
    {
        console.log(`error from registerUser`);
        console.log(error);
        res.json(error);
    }
    
}
// --------------old version-----------------
// // local signup function
// module.exports.processSignUpPage = async (req, res) =>
// {
//     let {displayName, email, password} = req.body;
//     // check password length
//     if(password.length < 8)
//     {
//         console.log("ERROR - PASSWORD IS LESS THAN 8");
//         return res.status(400).send("ERROR - PASSWORD IS LESS THAN 8");
//     }
//     // check email does it register before
//     let foundEmail = await User.findOne({email});
//     if (foundEmail)
//     {
//         console.log("ERROR - EMAIL HAVE BEEN REGISTERED");
//         return res.status(400).send("ERROR - EMAIL HAVE BEEN REGISTERED");
//     }
//     // everything OK!
//     let hashedPassword = await bcrypt.hash(password, 12);
//     let newUser = new User
//     (
//         {displayName, email, password: hashedPassword}
//     );
//     await newUser.save()
//         .then((user) =>
//         {
//             console.log("SUCCESSFUL REGISTRATION");
//             console.log(`user save: ${user}`);
//         })

//     return res.json(
//         {
//             msg: `SUCCESSFUL REGISTRATION, EMAIL:${email}`,
//             newUserObj: newUser
//         }
//     )
// };

// //login function
// module.exports.processLoginPage = (req, res) =>
// {
//     let {username, password} = req.body;
//     console.log(username);
//     console.log(password);
//     passport.authenticate("local",
//      {
//          failureMessage: "Could not Authenticated",
//          SuccessfullyMessage: "Successfully Authenticated User"
//      });
//     console.log(req.body.user);
//     return res.status(200).json({user: req.body.user});
    
// };

// // logout function
// module.exports.processLogout = (req, res) =>
// {
//     req.logout();
//     res.json("Logged Out Successfully");
// }