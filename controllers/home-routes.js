const router = require("express").Router();
const sequelize = require("../config/connection");
const { News } = require("../models");

require('dotenv').config();
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.API_KEY);

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
        news,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update the database with new news
router.post("/refresh-news", (req, res) => {
  // News.findAll({
  //   attributes: [
  //     "image_url",
  //     "title",
  //     "description"
  //   ],
  // })

  // To query everything
  newsapi.v2
    .everything({
      q: "olympic games",
      language: "en",
      from: "2021-07-20",
    })
    .then((rawNewsData) => {
      // console.log(rawNewsData);
      const newsAllData = Object.values(rawNewsData.articles);
      const newsNecessaryData = newsAllData.map(item => {
        return {
          image_url: item.urlToImage,
          title: item.title,
          description: item.description
        }
      })
      // console.log("toInsertBefore: ", newsNecessaryData);
      return newsNecessaryData;
    }).then(dbNewsData => {
      // console.log("toInsertAfter: ", dbNewsData);
      News.bulkCreate(dbNewsData);
      
      return dbNewsData;
    }).then(test =>res.json(test))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
