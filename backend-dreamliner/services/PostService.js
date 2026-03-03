const { PostRepository } = require("../repository/PostRepository");

class PostService {
  static async findPostById(PostId, UserId) {
    // Panggil PostRepository untuk mendapatkan data post berdasarkan id
    const postData = await PostRepository.findPostById(PostId);

    let isLikeByUserId = false;

    if (UserId && postData) {
      // Cek apakah user sudah like post ini atau belum
      isLikeByUserId = postData.Likes.some(
        (like) => like.UserId === parseInt(UserId),
      );
    }

    return {
      postData,
      isLikeByUserId,
      UserId,
    };
  }

  static async likePost(PostId, UserId) {
    //  Cari post berdasarkan PostId
    const cekPost = await PostRepository.findPostById(PostId);

    if (!cekPost) {
      throw { name: "POST_NOT_FOUND" };
    }

    // Cek apakah user sudah like post ini atau belum
    const cekLike = await PostRepository.findLike(PostId, UserId);

    if (cekLike) {
      // Jika sudah like, maka unlike (hapus data like)
      await cekLike.destroy();
      return { liked: false, action: "unliked", likeData: cekLike };
    }

    // Jika belum like, maka buat data like baru
    const newLike = await PostRepository.createLike(PostId, UserId);

    return { liked: true, action: "liked", likeData: newLike };
  }
}

module.exports = {
  PostService,
};
