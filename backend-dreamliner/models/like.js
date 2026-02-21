"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Like terhadap User
      Like.belongsTo(models.User, { foreignKey: "UserId", as: "User" });

      // Like terhadap Post
      Like.belongsTo(models.Post, { foreignKey: "PostId", as: "Post" });

      
    }
  }
  Like.init(
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
    },
    {
      sequelize,
      modelName: "Like",
      paranoid: true,
      timestamps: true,
    },
  );
  return Like;
};
