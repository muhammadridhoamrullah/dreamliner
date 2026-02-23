const { authRouter } = require("./authRouter");
const { userRouter } = require("./userRouter");

const router = require("express").Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);

module.exports = {
  router,
};
