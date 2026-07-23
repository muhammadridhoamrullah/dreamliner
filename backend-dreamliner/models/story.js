"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Story extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Story terhadap User
      Story.belongsTo(models.User, { foreignKey: "UserId", as: "User" });

      // Story terhadap StoryView
      Story.hasMany(models.StoryView, { foreignKey: "StoryId", as: "Viewers" });

      // Story Terhadap StoryReply
      Story.hasMany(models.StoryReply, {
        foreignKey: "StoryId",
        as: "Replies",
      });
    }
  }
  Story.init(
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
      mediaType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Media Type is required",
          },
          notEmpty: {
            msg: "Media Type is required",
          },
        },
        defaultValue: "image",
      },
      mediaUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Media URL is required",
          },
          notEmpty: {
            msg: "Media URL is required",
          },
        },
      },
      caption: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      privacy: {
        type: DataTypes.STRING,
        defaultValue: "public",
      },
      allowReply: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      allowShare: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      expiresAt: {
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Story",
      paranoid: true,
      timestamps: true,
    },
  );

  Story.beforeCreate((story) => {
    story.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // Set expiresAt to 24 hours from now
  });
  return Story;
};

// User hasMany Story
// Story belongsTo User
// Story hasMany StoryView
// StoryView belongsTo Story
// StoryView belongsTo User sebagai Viewer
// Jika pakai reply:

// Story hasMany StoryReply
// StoryReply belongsTo Story
// StoryReply belongsTo User sebagai Sender
