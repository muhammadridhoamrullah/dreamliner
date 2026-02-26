const {
  User,
  Post,
  Comment,
  Like,
  Follow,
  Notification,
} = require("../models/index");

class UserRepository {
  static async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  static async findByUsername(username) {
    return await User.findOne({
      where: { username },
      attributes: {
        exclude: ["password", "updatedAt"],
      },
      include: [
        {
          model: Post,
          as: "Posts",
          include: [
            {
              model: Like,
              as: "Likes",
            },
            {
              model: Comment,
              as: "Comments",
            },
          ],
        },
        {
          model: Comment,
          as: "Comments",
        },
        {
          model: Like,
          as: "Likes",
        },
        {
          model: User,
          as: "Followers",
          through: { attributes: [] },
        },
        {
          model: User,
          as: "Followings",
          through: { attributes: [] },
        },
        {
          model: Notification,
          as: "Notifications",
        },
      ],
    });
  }

  static async createUser(data) {
    return await User.create(data);
  }

  static async updateUser(id) {
    return await User.update(
      {
        isVerified: true,
      },
      {
        where: { id },
      },
    );
  }

  static async findById(id) {
    return await User.findByPk(id, {
      attributes: {
        exclude: ["password", "updatedAt"],
      },
    });
  }
}

module.exports = {
  UserRepository,
};
