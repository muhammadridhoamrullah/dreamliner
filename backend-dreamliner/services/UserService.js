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
}

module.exports = {
  UserService,
};
