const router = require("express").Router();
const { User, Comment, News } = require("../models");
// TODO: Why withAuth does not work for the GET route???
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const currentUserData = await User.findOne({
      attributes: ["id"],
      where: {
        username: req.session.username,
      },
    });
    const currentUserID = currentUserData.id;

    const allCommentsforCurrentUserData = await Comment.findAll({
      attributes: ["id", "comment_text", "news_id"],
      where: {
        user_id: currentUserID,
      },
      include: [
        {
          model: News,
          attributes: ["id", "title"],
        },
      ],
    });

    const allCommentsforCurrentUser = allCommentsforCurrentUserData.map(
      (comment) => comment.get({ plain: true })
    );

    console.log(allCommentsforCurrentUser);

    //Collect an array of unique news
    let allUniqueNews = [];
    for (let i = 0; i < allCommentsforCurrentUser.length; i++) {
      if (!allUniqueNews.includes(allCommentsforCurrentUser[i].news_id)) {
        allUniqueNews.push(allCommentsforCurrentUser[i].news_id);
      }
    }

    // Collect news and comments for them in the next order: 1 news - many comments
    let allNewsAndComments = [];
    allUniqueNews.forEach((newsID) => {
      let newsTitle;
      let comments = [];
      for (let i = 0; i < allCommentsforCurrentUser.length; i++) {
        if (newsID === allCommentsforCurrentUser[i].news_id) {
          if (!newsTitle) {
            newsTitle = allCommentsforCurrentUser[i].news.title;
          }
          console.log("TESTTEST", allCommentsforCurrentUser[i]);
          comments.push(allCommentsforCurrentUser[i].comment_text);
        }
      }
      allNewsAndComments.push({ newsTitle: newsTitle, comments: comments });
    });

    console.log("allNewsAndComments: ", allNewsAndComments);

    res.render("dashboard", { allNewsAndComments, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
