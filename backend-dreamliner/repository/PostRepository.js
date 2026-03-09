const { Op } = require("sequelize");
const { Post, User, Comment, Like, Follow } = require("../models/index");

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
          include: [
            {
              model: User,
              as: "User",
              attributes: ["id", "username", "avatar", "isVerified"],
            },
          ],
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

  static async createComment(PostId, UserId, comment) {
    // Panggil model Comment untuk membuat data comment baru
    const newComment = await Comment.create({
      PostId,
      UserId,
      content: comment,
    });

    // Fetch comment dengan author
    const commentWithuthor = await Comment.findByPk(newComment.id, {
      include: [
        {
          model: User,
          as: "Author",
          attributes: ["id", "username", "avatar", "isVerified", "createdAt"],
        },
      ],
    });

    return commentWithuthor;
  }

  static async findFollowing(UserId) {
    // Panggil model Follow untuk mendapatkan data following user
    const followingData = await Follow.findAll({
      where: {
        FollowerId: UserId,
      },
      attributes: ["FollowingId"],
    });

    return followingData;
  }

  static async findFeedByFollowingIds(followingIds) {
    // Panggil model Post untuk mendapatkan data post berdasarkan following user
    const feedData = await Post.findAll({
      where: {
        UserId: followingIds,
      },
      include: [
        {
          model: User,
          as: "Author",
          attributes: ["id", "username", "avatar", "isVerified"],
        },
        {
          model: Like,
          as: "Likes",
          include: [
            {
              model: User,
              as: "User",
              attributes: ["id", "username", "avatar", "isVerified"],
            },
          ],
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
      ],
      order: [["createdAt", "DESC"]],
    });

    return feedData;
  }

  static async findExplorePosts(followingIds) {
    // Panggil model Post untuk mendapatkan data post berdasarkan following user

    let whereClause = {};
    if (followingIds.length > 0) {
      whereClause.UserId = {
        [Op.notIn]: followingIds,
      };
    }

    const exploreData = await Post.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: "Author",
          attributes: ["id", "username", "avatar", "isVerified"],
        },
        {
          model: Like,
          as: "Likes",
          include: [
            {
              model: User,
              as: "User",
              attributes: ["id", "username", "avatar", "isVerified"],
            },
          ],
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
      ],
    });

    return exploreData;
  }

  static async createPost(UserId, imageUrl, caption) {
    // Panggil model Post untuk membuat data post baru
    const newPost = await Post.create({
      UserId,
      imageUrl,
      caption,
    });
    console.log(newPost, "newPost PostRepo");

    return newPost;
  }
}
module.exports = {
  PostRepository,
};
