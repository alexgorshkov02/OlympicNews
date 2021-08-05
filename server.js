const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ extname: ".handlebars" });
const sequelize = require("./config/connection");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const Handlebars = require("handlebars");

const app = express();
const PORT = process.env.PORT || 3001;

Handlebars.registerHelper("list", function (context) {
  let result = "<ul>";

  for (let prop in context) {
    // Get the title to display
    const title = "<li>" + prop;

    // Get the comments for the title to display
    const comments = context[prop].map((el) => {
      return `<li> ${el.comment} <button type="button" id="edit-${el.commentID}">Edit</button> <button type="button" id="remove-${el.commentID}">Remove</button></li>`;
    });

    // Merge the title and the comments
    result += `${title} <ul> ${comments.join(" ")} </ul> </li> </br> </br>`;
  }
  return result + "</ul>";
});

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

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(require("./controllers/"));

app.get("/", function (req, res) {
  res.render("homepage");
});

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening on PORT: " + PORT));
});
