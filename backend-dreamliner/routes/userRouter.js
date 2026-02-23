const { UserController } = require("../controllers/userController");
const { authentication } = require("../middlewares/authentication");

const userRouter = require("express").Router();

userRouter.use(authentication);
userRouter.get("/me", UserController.getMyProfile);

module.exports = {
  userRouter,
};
