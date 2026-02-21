"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // User terhadap Follow sebagai Followers
      User.belongsToMany(models.User, {
        through: models.Follow,
        as: "Followers",
        foreignKey: "FollowingId",
        otherKey: "FollowerId",
      });

      // User terhadap Follow sebagai Followings
      User.belongsToMany(models.User, {
        through: models.Follow,
        as: "Followings",
        foreignKey: "FollowerId",
        otherKey: "FollowingId",
      });

      // User terhadap Post
      User.hasMany(models.Post, { foreignKey: "UserId", as: "Posts" });

      // User terhadap Like
      User.hasMany(models.Like, { foreignKey: "UserId", as: "Likes" });

      // User terhadap Comment
      User.hasMany(models.Comment, { foreignKey: "UserId", as: "Comments" });

      // User terhadap Notification
      User.hasMany(models.Notification, {
        foreignKey: "UserId",
        as: "Notifications",
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        unique: {
          msg: "Username already exists",
        },
        allowNull: false,
        validate: {
          notNull: {
            msg: "Username is required",
          },
          notEmpty: {
            msg: "Username is required",
          },
          len: {
            args: [4, 20],
            msg: "Username must be between 4 and 20 characters",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          msg: "Email already exists",
        },
        allowNull: false,
        validate: {
          notNull: {
            msg: "Email is required",
          },
          notEmpty: {
            msg: "Email is required",
          },
          isEmail: {
            msg: "Email format is invalid",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password is required",
          },
          notEmpty: {
            msg: "Password is required",
          },
          len: {
            args: [6, 50],
            msg: "Password must be between 6 and 60 characters",
          },
        },
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      avatar: {
        type: DataTypes.STRING,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      paranoid: true,
      timestamps: true,
    },
  );
  User.beforeCreate(async (el) => {
    el.password = await hashPassword(el.password);
  });
  return User;
};
