var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var PORT = process.env.PORT || 3000;
var routes = require("./controllers/tutors_controllers.js");
var app = express();

var db = require("./models");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use("/", routes);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({
  logging: console.log
 }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});



