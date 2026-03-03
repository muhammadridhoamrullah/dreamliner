const { PostService } = require("../services/PostService");

class PostController {
  static async findPostById(req, res, next) {
    try {
      const { PostId } = req.params;
      const UserId = req.user?.id || null;

      if (!PostId) {
        throw { name: "POST_ID_REQUIRED" };
      }

      //   Panggil service untuk mendapatkan data post berdasarkan id
      const postData = await PostService.findPostById(PostId, UserId);
      console.log(postData, "PostData Controller");

      res.status(200).json({
        success: true,
        data: postData,
        message: "Get post by id success",
      });
    } catch (error) {
      console.log(error, "error dimana");

      next(error);
    }
  }

  static async likePost(req, res, next) {
    try {
      const { PostId } = req.params;
      const UserId = req.user.id;

      if (!PostId) {
        throw { name: "POST_ID_REQUIRED" };
      }

      const likeResult = await PostService.likePost(PostId, UserId);

      res.status(200).json({
        success: true,
        data: likeResult,
        message: likeResult.liked
          ? "Post liked successfully"
          : "Post unliked successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  PostController,
};
