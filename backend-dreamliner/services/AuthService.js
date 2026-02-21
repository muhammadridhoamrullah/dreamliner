const { comparePassword } = require("../helpers/bcrypt");
const { signToken, verifyToken } = require("../helpers/jwt");

const {
  sendVerificationEmail,
  sendLoginNotification,
} = require("../rabbitMQ/producers/emailQueue");
const { UserRepository } = require("../repository/UserRepository");

class AuthService {
  static async login(data) {
    // Cari user berdasarkan email
    const user = await UserRepository.findByEmail(data.email);

    if (!user) {
      throw { name: "LOGIN_EMAIL_PASS_INVALID" };
    }

    // Check password
    const checkPassword = await comparePassword(data.password, user.password);

    if (!checkPassword) {
      throw { name: "LOGIN_EMAIL_PASS_INVALID" };
    }

    // Check apakah verified
    if (!user.isVerified) {
      throw { name: "USER_NOT_VERIFIED" };
    }

    const access_token = signToken({ id: user.id });

    // Panggil producer untuk mengirim email notification login berhasil
    await sendLoginNotification({
      email: data.email,
      device: data.device,
      ipAddress: data.ipAddress,
    });

    return access_token;
  }

  static async register(data) {
    // Cek username sudah ada atau belum
    const existingUsername = await UserRepository.findByUsername(data.username);

    if (existingUsername) {
      throw { name: "REGISTER_USERNAME_EXISTS" };
    }

    // Cek email sudah ada atau belum
    const existingEmail = await UserRepository.findByEmail(data.email);

    if (existingEmail) {
      throw { name: "REGISTER_EMAIL_EXISTS" };
    }

    // Buat user baru
    const newUser = await UserRepository.createUser(data);

    // Buat token untuk verifikasi email
    const verificationToken = signToken(
      { id: newUser.id, email: newUser.email },
      { expiresIn: "1h" },
    );

    // Link
    const link = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

    // Panggil producer untuk mengirim email verifikasi ke RabbitMQ
    await sendVerificationEmail({
      email: newUser.email,
      UserId: newUser.id,
      username: newUser.username,
      link: link,
    });

    return newUser;
  }

  static async verifyEmail(token) {
    // Verifikasi token terlebih dahulu
    const decoded = verifyToken(token);
    console.log(decoded, "decoded");

    // Cari user berdasarkan id dari token
    const user = await UserRepository.findByEmail(decoded.email);

    if (!user) {
      throw { name: "USER_NOT_FOUND" };
    }

    // Update status isVerified menjadi true
    const updatingUser = await UserRepository.updateUser(user.id);

    if (updatingUser[0] === 0) {
      throw { name: "USER_UPDATE_FAILED" };
    }

    return true;
  }
}

module.exports = {
  AuthService,
};
