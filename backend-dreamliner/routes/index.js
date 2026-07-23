const { authRouter } = require("./authRouter");
const { postRouter } = require("./postRouter");
const { storyRouter } = require("./storyRouter");
const { userRouter } = require("./userRouter");

const router = require("express").Router();

router.use("/auth", authRouter);
router.use("/posts", postRouter);
router.use("/users", userRouter);
router.use("/stories", storyRouter);

module.exports = {
  router,
};
