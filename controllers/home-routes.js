const router = require("express").Router();
const sequelize = require("../config/connection");
const { News } = require("../models");

// get all news for homepage
router.get("/", (req, res) => {
  console.log("======================");
  News.findAll({
    attributes: [
      "image_url",
      "title",
      "description",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM comment WHERE news.id = comment.news_id)"
        ),
        "comment_count",
      ],
    ],
  })
    .then((dbNewsData) => {
      const news = dbNewsData.map((news) => news.get({ plain: true }));
      res.render("homepage", {
        news
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;
