const { Post, User, Comment, Like } = require("../models/index");

class PostRepository {
  static async findPostById(PostId) {
    // Panggil model Post untuk mendapatkan data post berdasarkan id
    const postData = await Post.findByPk(PostId, {
      include: [
        {
          model: User,
          as: "Author",
          attributes: ["id", "username", "avatar", "isVerified"],
        },
        {
          model: Comment,
          as: "Comments",
        },
        {
          model: Like,
          as: "Likes",
        },
      ],
    });

    return postData;
  }
}
module.exports = {
  PostRepository,
};
