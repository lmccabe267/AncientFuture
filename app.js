const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/images")));
app.use(express.static(path.join(__dirname, "/styles")));

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("*", (req, res, next) => {
  next(new ExpressError("Page not found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 400 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).render("error", { err });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
