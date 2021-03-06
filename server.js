// Set up the Express app
const express = require("express");
const session = require("express-session")
const app = express();
const PORT = process.env.PORT || 8080;

// Requiring models for syncing
const db = require("./models");

// App optimization
const compression = require("compression")
app.use(compression())

// Handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Allows for login sessions via cookies, login lasts for two hours
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2
  }
}))

// Set Handlebars
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// User dialogue routes
const userDialogueRoutes = require("./controllers/userDialogueController.js");
app.use("/api", userDialogueRoutes)

// User routes
const userRoutes = require("./controllers/userController.js");
app.use(userRoutes)

// Event routes
const eventRoutes = require("./controllers/eventController.js");
app.use("/api/events", eventRoutes)

// HTML routes
const htmlRoutes = require("./controllers/html-controller.js");
app.use(htmlRoutes)

// AI route
const aiRoutes = require("./routes/ai-routes.js");
app.use(aiRoutes)

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});