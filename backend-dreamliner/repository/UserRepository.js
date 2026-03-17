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
          attributes: ["id", "username", "avatar", "isVerified"],
          through: { attributes: [] },
        },
        {
          model: User,
          as: "Followings",
          attributes: ["id", "username", "avatar", "isVerified"],
          through: { attributes: [] },
        },
        {
          model: Notification,
          as: "Notifications",
        },
      ],
    });
  }

  static async findByUsernameOnly(username) {
    return await User.findOne({
      where: {
        username,
      },
      attributes: ["id", "username", "avatar", "isVerified"],
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

  static async isFollowing(followerId, followingId) {
    const follow = await Follow.findOne({
      where: {
        FollowerId: followerId,
        FollowingId: followingId,
      },
    });

    return !!follow; // Mengembalikan true jika follow ditemukan, false jika tidak
  }

  static async unfollowUser(followerId, followingId) {
    return await Follow.destroy({
      where: {
        FollowerId: followerId,
        FollowingId: followingId,
      },
    });
  }

  static async followUser(followerId, followingId) {
    return await Follow.create({
      FollowerId: followerId,
      FollowingId: followingId,
    });
  }
}

module.exports = {
  UserRepository,
};
