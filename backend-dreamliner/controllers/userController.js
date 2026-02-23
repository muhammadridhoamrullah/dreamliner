const { UserService } = require("../services/UserService");

class UserController {
  static async getMyProfile(req, res, next) {
    try {
      const UserId = req.user.id;

      //   Panggil service untuk mendapatkan data user
      const userData = await UserService.getMyProfile(UserId);

      res.status(200).json({
        success: true,
        data: userData,
        message: "Get profile success",
      });
    } catch (error) {
      next(error);
    }
  }

  static async findByUsername(req, res, next) {
    try {
      const { username } = req.params;

      //   Panggil service untuk mendapatkan data user berdasarkan username
      const userData = await UserService.findByUsername(username);

      res.status(200).json({
        success: true,
        data: userData,
        message: "Get user by username success",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  UserController,
};
