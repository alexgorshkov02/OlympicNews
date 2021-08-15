const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
// const hbs = exphbs.create({ extname: ".handlebars" }); 
const sequelize = require("./config/connection");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
// const Handlebars = require("handlebars");
const helpers = require("./utils/helper.js");

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: "Super secret word",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine("handlebars", exphbs({
  helpers
}));

app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(require("./controllers/"));

app.get("/", function (req, res) {
  res.render("homepage");
});

// turn on connection to db and server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log("Now listening on PORT: " + PORT));
});
