const { PostController } = require("../controllers/postController");
const {
  authentication,
  optionalAuthentication,
} = require("../middlewares/authentication");

const postRouter = require("express").Router();

postRouter.get(
  "/explore",
  optionalAuthentication,
  PostController.getExplorePosts,
);
postRouter.get(
  "/find/:PostId",
  optionalAuthentication,
  PostController.findPostById,
);

postRouter.use(authentication);
// Post
postRouter.post("/createPost", PostController.createPost);
postRouter.get("/myFeed", PostController.getMyFeed);

// Like
postRouter.post("/likes/:PostId", PostController.likePost);

// Comment
postRouter.post("/comments/:PostId", PostController.commentPost);

module.exports = {
  postRouter,
};
