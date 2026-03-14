"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StoryReply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // StoryReply terhadap StoryId
      StoryReply.belongsTo(models.StoryId, {
        foreignKey: "StoryId",
        as: "Story",
      });

      // StoryReply terhadap User
      StoryReply.belongsTo(models.UserId, { foreignKey: "UserId", as: "User" });
    }
  }
  StoryReply.init(
    {
      StoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "StoryId is required",
          },
          notEmpty: {
            msg: "StoryId is required",
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
      message: {
        type: DataTypes.STRING,
      },
      deletedAt: {
        type: DataTypes.DATE,
        
      },
    },
    {
      sequelize,
      modelName: "StoryReply",
      paranoid: true,
      timestamps: true,
    },
  );
  return StoryReply;
};
