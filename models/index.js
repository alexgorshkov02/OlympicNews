// import all models
const News = require("./News");
const User = require("./User");
const Comment = require("./Comment");

// create associations
User.hasMany(Comment, {
  foreignKey: "user_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

News.hasMany(Comment, {
  foreignKey: "news_id",
});

Comment.belongsTo(News, {
  foreignKey: "news_id",
});

module.exports = { News, User, Comment };
