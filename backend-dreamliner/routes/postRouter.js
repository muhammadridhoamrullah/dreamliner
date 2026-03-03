const { PostController } = require("../controllers/postController");
const {
  authentication,
  optionalAuthentication,
} = require("../middlewares/authentication");

const postRouter = require("express").Router();

postRouter.get("/:PostId", optionalAuthentication, PostController.findPostById);

postRouter.use(authentication);
postRouter.post("/likes/:PostId", PostController.likePost);
postRouter.post("/comments/:PostId", PostController.commentPost);

module.exports = {
  postRouter,
};
