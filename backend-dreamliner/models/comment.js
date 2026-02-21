"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Comment terhadap User
      Comment.belongsTo(models.User, { foreignKey: "UserId", as: "Author" });

      // Comment terhadap Post
      Comment.belongsTo(models.Post, { foreignKey: "PostId", as: "Post" });

      
    }
  }
  Comment.init(
    {
      PostId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "PostId is required",
          },
          notEmpty: {
            msg: "PostId is required",
          },
        },
      },
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
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Content is required",
          },
          notEmpty: {
            msg: "Content is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Comment",
      paranoid: true,
      timestamps: true,
    },
  );
  return Comment;
};
