"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StoryView extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // StoryView terhadap Story
      StoryView.belongsTo(models.Story, { foreignKey: "StoryId", as: "Story" });

      // StoryView terhadap User
      StoryView.belongsTo(models.User, { foreignKey: "UserId", as: "Viewer" });
    }
  }
  StoryView.init(
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
    },
    {
      sequelize,
      modelName: "StoryView",
      timestamps: true,
    },
  );
  return StoryView;
};
