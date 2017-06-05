var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var PORT = process.env.PORT || 3000;
var routes = require("./controllers/tutors_controllers.js");
var passport = require('passport');
var session = require('express-session');
var env = require('dotenv').load();
var db = require("./models");
var compression = require('compression');
var cookieSession = require('cookie-session');

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// For Passport
// app.use(cookieSession({
//     keys: ['secret1', 'secret2']
// }));
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized:true})); //session secret

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use("/", routes);


require('./config/passport/passport.js')(passport);

// Syncing our sequelize models and then starting our express app


db.sequelize.sync({}).then(function() {
  logging:console.log,
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});