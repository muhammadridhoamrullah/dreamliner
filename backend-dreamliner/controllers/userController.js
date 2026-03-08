const { UserService } = require("../services/UserService");

class UserController {
  static async getMyProfile(req, res, next) {
    try {
      const UserId = req.user?.id;
      if (!UserId) {
        res.status(200).json({
          success: true,
          data: null,
          message: "No user logged in",
        });
        return;
      }

      //   Panggil service untuk mendapatkan data user
      const userData = await UserService.getMyProfile(UserId);
      console.log(userData, "userData di getMyProfile");

      res.status(200).json({
        success: true,
        data: userData,
        message: "Get profile success",
      });
    } catch (error) {
      console.log(error, "error di getMyProfile");

      next(error);
    }
  }

  static async findByUsername(req, res, next) {
    try {
      const { username } = req.params;
      const UserId = req.user?.id || null;
      console.log(UserId, "USER ID CONTROL");

      //   Panggil service untuk mendapatkan data user berdasarkan username
      const userData = await UserService.findByUsername(username);

      const newData = {
        ...userData.toJSON(),
        isMine: UserId === userData.id,
      };

      res.status(200).json({
        success: true,
        data: newData,
        message: "Get user by username success",
      });
    } catch (error) {
      next(error);
    }
  }

  static async followUser(req, res, next) {
    try {
      const { username } = req.params;
      const UserId = req.user.id;

      if (!username) {
        throw { name: "USERNAME_IS_REQUIRED" };
      }

      // Panggil service untuk follow user
      const result = await UserService.followUser(UserId, username);

      res.status(200).json({
        success: true,
        data: result,
        message: result.isFollowing
          ? `You are now following ${username}`
          : `You have unfollowed ${username}`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  UserController,
};
