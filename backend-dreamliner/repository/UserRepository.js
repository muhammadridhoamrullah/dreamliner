const { User } = require("../models/index");

class UserRepository {
  static async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  static async findByUsername(username) {
    return await User.findOne({ where: { username } });
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
}

module.exports = {
  UserRepository,
};
