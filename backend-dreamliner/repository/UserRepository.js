const { User } = require("../models/index");

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
