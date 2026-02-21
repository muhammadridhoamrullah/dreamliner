"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Follow terhadap User sebagai Follower
      Follow.belongsTo(models.User, {
        foreignKey: "FollowerId",
        as: "Follower",
      });

      // Follow terhadap User sebagai Following
      Follow.belongsTo(models.User, {
        foreignKey: "FollowingId",
        as: "Following",
      });
    }
  }
  Follow.init(
    {
      FollowerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "FollowerId is required",
          },
          notEmpty: {
            msg: "FollowerId is required",
          },
        },
      },
      FollowingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "FollowingId is required",
          },
          notEmpty: {
            msg: "FollowingId is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Follow",
      paranoid: true,
      timestamps: true,
    },
  );
  return Follow;
};
