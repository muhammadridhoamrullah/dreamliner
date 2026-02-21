const { AuthController } = require("../controllers/authController");

const authRouter = require("express").Router();

authRouter.post("/login", AuthController.login);
authRouter.post("/register", AuthController.register);
authRouter.patch("/verify-email", AuthController.verifyEmail);

module.exports = {
  authRouter,
};
