const { Op } = require("sequelize");
const { Story, User, StoryView, StoryReply } = require("../models/index");

class StoryRepository {
  static async createStory(
    UserId,
    mediaType,
    mediaUrl,
    caption,
    privacy,
    allowReply,
    allowShare,
  ) {
    // Panggil model Story untuk membuat data story baru di database
    const newStory = await Story.create({
      UserId,
      mediaType,
      mediaUrl,
      caption,
      privacy,
      allowReply,
      allowShare,
    });

    return newStory;
  }

  static async findStoryTrayByFollowingIds(followingIds, UserId) {
    // Panggil model Story untuk mengambil data story berdasarkan following user
    const storyTrayData = await Story.findAll({
      where: {
        UserId: followingIds,
        expiresAt: {
          [Op.gt]: new Date(), // Hanya ambil story yang belum expired
        },
        deletedAt: null, // Hanya ambil story yang belum dihapus
      },
      include: [
        {
          model: User,
          as: "User",
          attributes: ["id", "username", "avatar", "isVerified"],
        },
        {
          model: StoryView,
          as: "Viewers",
          attributes: ["id", "UserId", "createdAt"],
        },
      ],
      order: [
        ["createdAt", "DESC"],
        ["id", "DESC"],
      ],
    });

    return storyTrayData;
  }

  static async findStoryByUsername(username) {
    // Panggil model story untuk mengambil data story berdasarkan username
    let { count, rows } = await Story.findAndCountAll({
      where: {
        "$User.username$": username,
        expiresAt: {
          [Op.gt]: new Date(),
        },
        deletedAt: null,
      },
      include: [
        {
          model: User,
          as: "User",
          attributes: ["id", "username", "avatar", "isVerified"],
        },
        {
          model: StoryView,
          as: "Viewers",
          attributes: ["id", "UserId", "createdAt"],
          include: [
            {
              model: User,
              as: "Viewer",
              attributes: ["id", "username", "avatar", "isVerified"],
            },
          ],
          order: [["createdAt", "DESC"]],
        },
        {
          model: StoryReply,
          as: "Replies",
          attributes: ["id", "UserId", "message", "createdAt"],
          include: [
            {
              model: User,
              as: "User",
              attributes: ["id", "username", "avatar", "isVerified"],
            },
          ],
          order: [["createdAt", "DESC"]],
        },
      ],
    });

    const result = {
      count,
      rows,
    };

    return result;
  }

  static async checkIfStoryAlreadyViewed(StoryId, UserId) {
    // Panggil model StoryView untuk mengecek apakah user sudah melihat story tersebut
    const alreadyViewed = await StoryView.findOne({
      where: {
        StoryId,
        UserId,
      },
    });

    return alreadyViewed;
  }

  static async markStoryAsViewed(StoryId, UserId) {
    // Panggil model StoryView untuk membuat data baru yang menandai story tersebut sudah dilihat oleh user

    const newStoryView = await StoryView.create({
      StoryId,
      UserId,
    });

    return newStoryView;
  }

  static async replyStory(StoryId, UserId, message) {
    // Panggil model StoryReply untuk membuat data baru yang merupakan balasan dari story
    const newReplyStory = await StoryReply.create({
      StoryId,
      UserId,
      message,
    });

    return newReplyStory;
  }
}

module.exports = {
  StoryRepository,
};

// {
//     "success": true,
//     "data": [
//         {
//             "id": 3,
//             "UserId": 13,
//             "mediaType": "image",
//             "mediaUrl": "https://i.pinimg.com/736x/c4/ca/5d/c4ca5d1e754ed0bc6f9a1419267d5429.jpg",
//             "caption": "Lee Hyein ini",
//             "privacy": "public",
//             "allowReply": true,
//             "allowShare": true,
//             "expiresAt": "2026-03-15T09:19:19.452Z",
//             "deletedAt": null,
//             "createdAt": "2026-03-14T09:19:19.451Z",
//             "updatedAt": "2026-03-14T09:19:19.451Z",
//             "User": {
//                 "id": 13,
//                 "username": "leehyein",
//                 "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                 "isVerified": true
//             },
//             "Viewers": [],
//             "Replies": []
//         },
//         {
//             "id": 2,
//             "UserId": 13,
//             "mediaType": "image",
//             "mediaUrl": "https://i.pinimg.com/736x/c4/ca/5d/c4ca5d1e754ed0bc6f9a1419267d5429.jpg",
//             "caption": "Lee Hyein ini",
//             "privacy": "public",
//             "allowReply": true,
//             "allowShare": true,
//             "expiresAt": "2026-03-15T08:24:03.417Z",
//             "deletedAt": null,
//             "createdAt": "2026-03-14T08:24:03.400Z",
//             "updatedAt": "2026-03-14T08:24:03.400Z",
//             "User": {
//                 "id": 13,
//                 "username": "leehyein",
//                 "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                 "isVerified": true
//             },
//             "Viewers": [],
//             "Replies": []
//         },
//         {
//             "id": 1,
//             "UserId": 13,
//             "mediaType": "image",
//             "mediaUrl": "https://i.pinimg.com/736x/c4/ca/5d/c4ca5d1e754ed0bc6f9a1419267d5429.jpg",
//             "caption": "wew",
//             "privacy": "public",
//             "allowReply": true,
//             "allowShare": true,
//             "expiresAt": "2026-03-15T08:14:01.873Z",
//             "deletedAt": null,
//             "createdAt": "2026-03-14T08:14:01.872Z",
//             "updatedAt": "2026-03-14T08:14:01.872Z",
//             "User": {
//                 "id": 13,
//                 "username": "leehyein",
//                 "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                 "isVerified": true
//             },
//             "Viewers": [],
//             "Replies": []
//         }
//     ],
//     "message": "Get story tray success"
// }
