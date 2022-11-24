// configuration of Express.js
// import modules
const dotenv = require("dotenv");
dotenv.config();
const express= require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const compress = require("compression");
const methodOverride = require("method-override");
const session = require("express-session");
const cors = require("cors");
// passport
require("../config/passport.server.config");
const passport = require("passport");


//import custom modules
const indexRouter = require("../app/routes/index.server.routes");
const authRouter = require("../app/routes/auth.server.router");

const app = express();

if(process.env.NODE_ENV === "development")
{
    app.use(morgan("dev"));
}
else if (process.env.NODE_ENV === "production")
{
    app.use(compress());
}

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride());
app.use(session(
    {
        saveUninitialized: true,
        resave: true,
        secret: process.env.sessionSecret
    }
));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(
    {
        origin: "*"
    }
));

app.use(express.static("./public"));

// routes
app.use("/auth", authRouter);
app.use("/", indexRouter);

module.exports = app;

