const { Comment } = require("../models");

const commentdata = [
  {
    comment_text: "Cool news",
    news_id: 1,
    user_id: 1,
  },
  {
    comment_text: "Best comment",
    news_id: 1,
    user_id: 2,
  },
  {
    comment_text: "My opinion",
    news_id: 2,
    user_id: 3,
  },
  {
    comment_text: "New comment",
    news_id: 2,
    user_id: 4,
  },
  {
    comment_text: "Some words",
    news_id: 3,
    user_id: 1,
  },
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;
