// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
// Middleware that parses incoming requests that are urlencoded
app.use(express.urlencoded({ extended: true }));
// Middleware that parses incoming requests that are JSON
app.use(express.json());
// Middleware that serves static files that are in the public directory, combines req.url with the public directory to form a new file path
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
// Middleware to initialize passport for authentication
app.use(passport.initialize());
// Middlware that updates the request object's user value to the true user object that is deserialized
app.use(passport.session());

// Requiring our HTML and API routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
