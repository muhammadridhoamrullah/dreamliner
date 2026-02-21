const { logger } = require("../config/logger");
const { AuthService } = require("../services/AuthService");

class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw { name: "LOGIN_INPUT_INVALID" };
      }

      // Panggil logger untuk mencatat percobaan login
      logger.info("Login Attempt", {
        email: email,
        ip: req.ip,
      });

      const loginData = {
        email,
        password,
        device: req.headers["user-agent"] || "Unknown Device",
        ipAddress: req.ip || req.connection.remoteAddress || "Unknown IP",
      };

      //   Panggil Service untuk proses login
      const access_token = await AuthService.login(loginData);

      logger.info("Login Successful", {
        email: email,
        access_token: access_token,
      });

      res.status(200).json({
        success: true,
        data: access_token,
        message: "Login successful",
      });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { username, email, password, fullName, bio, avatar } = req.body;

      if (!username || !email || !password) {
        throw { name: "REGISTER_INPUT_INVALID" };
      }

      // Logger untuk mencatat percobaan registrasi
      logger.info("Registration Attempt", {
        email,
        ip: req.ip,
      });

      const data = {
        username,
        email,
        password,
        fullName,
        bio,
        avatar,
      };

      // Panggil service untuk proses registrasi
      const newUser = await AuthService.register(data);

      logger.info("Registration Successful", {
        email,
        UserId: newUser.id,
      });

      res.status(201).json({
        success: true,
        data: newUser.username,
        message:
          "Registration successful. Please check your email to verify your account.",
      });
    } catch (error) {
      next(error);
    }
  }

  static async verifyEmail(req, res, next) {
    try {
      const { token } = req.body;

      if (!token) {
        throw { name: "VERIFY_EMAIL_INPUT_INVALID" };
      }

      // Panggil service untuk proses verifikasi email
      const verifying = await AuthService.verifyEmail(token);

      res.status(200).json({
        success: true,
        data: verifying,
        message: "Email verification successful. You can now log in.",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  AuthController,
};

// LOGIN_INPUT_INVALID
// LOGIN_EMAIL_PASS_INVALID
// USER_NOT_VERIFIED
