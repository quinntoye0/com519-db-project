require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const chalk = require("chalk");

/**
 * Controllers (route handlers).
 */
const tasterController = require("./controllers/taster");
const tastingController = require("./controllers/tasting");

const app = express();
app.set("view engine", "ejs");
app.use(express.static( "public" ))

/**
 * notice above we are using dotenv. We can now pull the values from our environment
 */

const { WEB_PORT, MONGODB_URI } = process.env;

/**
 * connect to database
 */

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running.",
    chalk.red("✗")
  );
  process.exit();
});

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.render("index");
});





app.post("/create-taster")

app.get("/tasters", tasterController.list);
app.get("/tasters/delete/:id", tasterController.delete);

app.get("/tastings", tastingController.list);
app.get("/tastings/delete/:id", tastingController.delete);


app.listen(WEB_PORT, () => {
  console.log(
    `Example app listening at http://localhost:${WEB_PORT}`,
    chalk.green("✓")
  );
});
