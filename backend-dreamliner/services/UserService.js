const { UserRepository } = require("../repository/UserRepository");

class UserService {
  static async getMyProfile(UserId) {
    // Panggil repository untuk mendapatkan data user berdasarkan id
    const userData = await UserRepository.findById(UserId);

    if (!userData) {
      throw { name: "USER_NOT_FOUND" };
    }

    return userData;
  }

  static async findByUsername(username) {
    // Panggil repository untuk mendapatkan data user berdasarkan username
    const userData = await UserRepository.findByUsername(username);

    if (!userData) {
      throw { name: "USER_NOT_FOUND" };
    }

    return userData;
  }

  static async followUser(UserId, username) {
    // Panggil repository untuk mendapatkan data user berdasarkan username
    const user = await UserRepository.findByUsernameOnly(username);

    if (!user) {
      throw { name: "USER_NOT_FOUND" };
    }

    // Cek apakah sudah follow
    const isFollowing = await UserRepository.isFollowing(UserId, user.id);

    if (isFollowing) {
      // Unfollow user
      const unfollow = await UserRepository.unfollowUser(UserId, user.id);

      return {
        isFollowing: false,
        message: "Unfollow user success",
      };
    }

    // Follow user
    const follow = await UserRepository.followUser(UserId, user.id);

    return {
      isFollowing: true,
      message: "Follow user success",
    };
  }
}

module.exports = {
  UserService,
};
