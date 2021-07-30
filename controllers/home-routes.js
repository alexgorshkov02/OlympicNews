const router = require("express").Router();
const sequelize = require("../config/connection");
const { News, Comment } = require("../models");

// get all news for homepage
//TODO: Change to "/". Propogate the data to the homepage. 
router.get("/test", (req, res) => {
  console.log("======================");
  News.findAll({
    attributes: ["image_url", "title", "description"],
    include: [
      {
        model: Comment,
        attributes: [
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM comment WHERE news.id = comment.news_id)"
            ),
            "comments_count",
          ],
        ],
      },
    ],
  })
    .then((dbNewsData) => {
      const news = dbNewsData.map((news) => news.get({ plain: true }));
      console.log(news);

    //TODO: Implement the render part. Now send res.json back temporary
        // res.render("homepage", {
        //   news
        // });
      res.json(news);

    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
