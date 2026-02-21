const { authRouter } = require("./authRouter");

const router = require("express").Router();

router.use("/auth", authRouter);

module.exports = {
  router,
};
