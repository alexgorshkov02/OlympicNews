const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create News model
class News extends Model {}

// create fields/columns for News model
News.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    image_url: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      validate: {
        isURL: true,
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "news",
  }
);

module.exports = News;
