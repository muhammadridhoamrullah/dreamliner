const { UserController } = require("../controllers/userController");
const {
  authentication,
  optionalAuthentication,
} = require("../middlewares/authentication");

const userRouter = require("express").Router();

userRouter.get(
  "/find/:username",
  optionalAuthentication,
  UserController.findByUsername,
);
userRouter.use(authentication);
userRouter.get("/me", UserController.getMyProfile);
userRouter.post("/follow/:username", UserController.followUser);

module.exports = {
  userRouter,
};
