
const path = require('path');
const express = require("express");
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));


app.get('/', function (req, res) {
  res.render('homepage');
});

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening on PORT: " + PORT));
});
