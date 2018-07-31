const express = require("express");
const nunjucks = require("nunjucks");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

nunjucks.configure("views", {
    autoescape: true,
    express: app
});

app.set("view engine", "njk");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("main", { nome: "Maiko Silva" });
});

app.get("/major", (req, res) => {
    console.log(req.query.nome);
    res.render("major", { nome: req.query.nome });
});

app.post("/check", (req, res) => {
    //console.log(req.body);
    //res.send(`Nome: ${req.body.user}
    //e senha: ${req.body.pass}`);

    res.redirect(`../major?nome=${req.body.nome}`);
});

app.listen(3000);
