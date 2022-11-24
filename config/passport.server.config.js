const passport = require("passport");
const User = require("../app/models/user.server.model");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

passport.serializeUser((user, done) => 
{
    console.log("Serializing User...");
    done(null, user._id);
    // grab the mongoDB's id -> store to the session
});

passport.deserializeUser(async (_id, done) => 
{
    console.log("deserializing User...");
    let foundUser = await User.findOne({_id});
    done(null, foundUser); 
    // assign foundUser to req.user
    // -> req.isAuthenticated = true
});

// Local Strategy
passport.use(new LocalStrategy(async(username, password, done) => 
{
    let foundUser = await User.findOne({email: username});
    if(foundUser)
    {
        let result = await bcrypt.compare(password, foundUser.password);
        if(result)
        {
            done(null, foundUser);
        }
        else
        {
            done(null, false);
        }
    }
    else
    {
        done(null, false);
    }
}))