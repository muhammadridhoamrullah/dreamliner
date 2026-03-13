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

  static async commentPost(req, res, next) {
    try {
      const { PostId } = req.params;
      const UserId = req.user.id;
      const { comment } = req.body;
      console.log(UserId, "UserId cinta");

      if (!PostId) {
        throw { name: "POST_ID_REQUIRED" };
      }

      if (!comment) {
        throw { name: "COMMENT_CONTENT_REQUIRED" };
      }

      // Panggil service untuk membuat komentar baru
      const commentResult = await PostService.commentPost(
        PostId,
        UserId,
        comment,
      );
      console.log(commentResult, "commentResult PostController");

      res.status(201).json({
        success: true,
        data: commentResult,
        message: "Comment added successfully",
      });
    } catch (error) {
      console.log(error, "error apa");

      next(error);
    }
  }

  static async getMyFeed(req, res, next) {
    try {
      const UserId = req.user.id;
      console.log(UserId, "uSER id controller");
      const { page = 1, limit = 5 } = req.query;

      // Panggil service untuk mendapatkan feed pengguna
      const myFeedData = await PostService.getMyFeed(
        UserId,
        parseInt(page),
        parseInt(limit),
      );

      res.status(200).json({
        success: true,
        data: myFeedData.posts,
        hasMore: myFeedData.hasMore,
        totalCount: myFeedData.totalCount,
        currentPage: parseInt(page),
        message: "Get my feed success",
      });
    } catch (error) {
      next(error);
    }
  }

  static async getExplorePosts(req, res, next) {
    try {
      const UserId = req.user?.id || null;
      const { page = 1, limit = 12 } = req.query;

      // Panggil service untuk mendapatkan explore posts
      const explorePostsData = await PostService.getExplorePosts(
        UserId,
        parseInt(page),
        parseInt(limit),
      );

      res.status(200).json({
        success: true,
        data: explorePostsData.posts,
        hasMore: explorePostsData.hasMore,
        totalCount: explorePostsData.totalCount,
        currentPage: parseInt(page),
        message: "Get explore posts success",
      });
    } catch (error) {
      next(error);
    }
  }

  static async createPost(req, res, next) {
    try {
      const UserId = req.user.id;
      const { imageUrl, caption } = req.body;

      if (!imageUrl) {
        throw { name: "IMAGE_URL_REQUIRED" };
      }

      // Panggil service untuk membuat post baru
      const newPost = await PostService.createPost(UserId, imageUrl, caption);

      res.status(201).json({
        success: true,
        data: newPost,
        message: "Post created successfully",
      });
    } catch (error) {
      console.log(error, "Error apa");

      next(error);
    }
  }
}

module.exports = {
  PostController,
};
