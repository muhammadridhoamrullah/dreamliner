const { PostController } = require("../controllers/postController");

const postRouter = require("express").Router();

postRouter.get("/:PostId", PostController.findPostById)

module.exports = {
    postRouter,
};
