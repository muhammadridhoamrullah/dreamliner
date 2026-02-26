const { authRouter } = require("./authRouter");
const { postRouter } = require("./postRouter");
const { userRouter } = require("./userRouter");

const router = require("express").Router();

router.use("/auth", authRouter);
router.use("/posts", postRouter);
router.use("/users", userRouter);

module.exports = {
  router,
};
