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
userRouter.get(
  "/find-only/:username",
  optionalAuthentication,
  UserController.onlyCheckUsername,
);
userRouter.get("/me", optionalAuthentication, UserController.getMyProfile);
userRouter.use(authentication);
userRouter.post("/follow/:username", UserController.followUser);

module.exports = {
  userRouter,
};
