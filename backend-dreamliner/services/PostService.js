const { PostRepository } = require("../repository/PostRepository");

class PostService {
  static async findPostById(PostId) {
    // Panggil PostRepository untuk mendapatkan data post berdasarkan id
    const postData = await PostRepository.findPostById(PostId);

    return postData;
  }
}

module.exports = {
  PostService,
};
