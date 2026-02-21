"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Post terhadap user
      Post.belongsTo(models.User, { foreignKey: "UserId", as: "Author" });

      // Post terhadap Like
      Post.hasMany(models.Like, { foreignKey: "PostId", as: "Likes" });

      // Post terhadap Comment
      Post.hasMany(models.Comment, { foreignKey: "PostId", as: "Comments" });

      
    }
  }
  Post.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "UserId is required",
          },
          notEmpty: {
            msg: "UserId is required",
          },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Image URL is required",
          },
          notEmpty: {
            msg: "Image URL is required",
          },
          isUrl: {
            msg: "Image URL format is invalid",
          },
        },
      },
      caption: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Post",
      paranoid: true,
      timestamps: true,
    },
  );
  return Post;
};
