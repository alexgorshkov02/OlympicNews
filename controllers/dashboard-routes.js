const router = require("express").Router();
const { Comment, News } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    // Get all comments for the current user
    const allCommentsforCurrentUserData = await Comment.findAll({
      attributes: ["id", "comment_text", "news_id"],
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: News,
          attributes: ["id", "title"],
        },
      ],
    });

    // Modify database results to plain
    const allCommentsforCurrentUser = allCommentsforCurrentUserData.map(
      (comment) => comment.get({ plain: true })
    );

    // Create an array news, comment and comment ID
    let allNewsAndComments = [];
    for (let i = 0; i < allCommentsforCurrentUser.length; i++) {
      allNewsAndComments.push({
        newsTitle: allCommentsforCurrentUser[i].news.title,
        comment: allCommentsforCurrentUser[i].comment_text,
        commentID: allCommentsforCurrentUser[i].id,
      });
    }

    // Group the comments based on the titles
    let allNewsAndCommentsToDisplay = allNewsAndComments.reduce((r, a) => {
      r[a.newsTitle] = r[a.newsTitle] || [];
      
      const commentWithID = {
        comment: a.comment,
        commentID: a.commentID,
      };

      r[a.newsTitle].push(commentWithID);
      return r;
    }, {});

    // Render the results for the user
    res.render("dashboard", { allNewsAndCommentsToDisplay, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
