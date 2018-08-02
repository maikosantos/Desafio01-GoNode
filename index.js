const express = require("express");
const nunjucks = require("nunjucks");
const path = require("path");
const bodyParser = require("body-parser");
const moment = require("moment");

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app
});

app.set("view engine", "njk");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("main");
});

app.get("/major", (req, res) => {
  //console.log(req.query.nome);
  res.render("major", { nome: req.query.nome });
});

app.get("/minor", (req, res) => {
  //console.log(req.query.nome);
  res.render("minor", { nome: req.query.nome });
});

app.post("/check", (req, res) => {
  if (req.body.nome === "" || req.body.data === "") {
    res.redirect(`../`);
    return;
  }

  const dataNascimento = req.body.data;
  const idade = moment().diff(moment(dataNascimento, "DD/MM/YYYY"), "years");

  if (idade < 18) {
    res.redirect(`../minor?nome=${req.body.nome}`);
  } else {
    res.redirect(`../major?nome=${req.body.nome}`);
  }
});

app.listen(3000);
