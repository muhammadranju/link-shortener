const express = require("express");
const app = express();
const ejs = require("ejs");
const middleware = require("../middleware/middleware");
const routes = require("../routes/");

app.engine("ejs", ejs.renderFile);
app.set("view engine", "ejs"); // Corrected: Pass 'ejs' as a string

app.use(express.static("public"));
app.use([middleware, routes]);

module.exports = app;
