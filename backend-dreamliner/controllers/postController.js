const { PostService } = require("../services/PostService");

class PostController {
  static async findPostById(req, res, next) {
    try {
      const { PostId } = req.params;

      if (!PostId) {
        throw { name: "POST_ID_REQUIRED" };
      }

      //   Panggil service untuk mendapatkan data post berdasarkan id
      const postData = await PostService.findPostById(PostId);
      console.log(postData, "PostData Controller");

      res.status(200).json({
        success: true,
        data: postData,
        message: "Get post by id success",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  PostController,
};
