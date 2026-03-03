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
          include: [
            {
              model: User,
              as: "Author",
              attributes: [
                "id",
                "username",
                "avatar",
                "isVerified",
                "createdAt",
              ],
            },
          ],
        },
        {
          model: Like,
          as: "Likes",
        },
      ],
    });

    return postData;
  }

  static async findLike(PostId, UserId) {
    // Panggil model Like untuk mengecek apakah user sudah like post ini atau belum
    const likeData = await Like.findOne({
      where: {
        PostId,
        UserId,
      },
    });

    return likeData;
  }

  static async createLike(PostId, UserId) {
    // Panggil model Like untuk membuat data like baru
    const newLike = await Like.create({
      PostId,
      UserId,
    });

    return newLike;
  }
}
module.exports = {
  PostRepository,
};
