const router = require("express").Router();
const sequelize = require("../config/connection");
const { News } = require("../models");

require("dotenv").config();
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
    order: [["id", "DESC"]],
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
router.get("/refresh-news", async (req, res) => {
  try {
    // Get all existing news
    const allExistingNewsRaw = await News.findAll({
      attributes: ["image_url", "title", "description"],
    });

    // Get all title from the existing news
    const allExistingNewsTitles = allExistingNewsRaw.map((news) => news.title);
    // console.log(allExistingNews);

    // Get all news about olympic games from the newsapi
    const newsRawRemote = await newsapi.v2.everything({
      q: "olympic games",
      language: "en",
      from: "2021-07-20",
    });

    // Check if a title exists in the existing database. If not, new news will be added
    const newsDataRemote = newsRawRemote.articles
      .filter((article) => !allExistingNewsTitles.includes(article.title))
      .map(({ urlToImage, title, description }) => ({
        image_url: urlToImage,
        title,
        description,
      }));

    console.log("TTTTTTTTTTTTTTT: ", newsDataRemote);

    // Add new news to database
    News.bulkCreate(newsDataRemote);

    res.send("ok");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
