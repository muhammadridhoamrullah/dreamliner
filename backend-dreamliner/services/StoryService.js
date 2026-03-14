const { PostRepository } = require("../repository/PostRepository");
const { StoryRepository } = require("../repository/StoryRepository");

class StoryService {
  static async createStory(
    UserId,
    mediaType,
    mediaUrl,
    caption,
    privacy,
    allowReply,
    allowShare,
  ) {
    //  Panggil StoryRepository untuk membuat data story baru
    const newStory = await StoryRepository.createStory(
      UserId,
      mediaType,
      mediaUrl,
      caption,
      privacy,
      allowReply,
      allowShare,
    );

    return newStory;
  }

  static async getStoryTray(UserId) {
    // Panggil Repo untuk mengambil data following user
    const followingData = await PostRepository.findFollowing(UserId);
    console.log(followingData, "followingData Service");

    let followingIds = followingData.map((el) => el.FollowingId);
    console.log(followingIds, "followingIds Service");

    // Panggil StoryRepository untuk mengambil data story berasarkan following user
    const storyTrayData = await StoryRepository.findStoryTrayByFollowingIds(
      followingIds,
      UserId,
    );

    // Tambahkan informasi apakah user sudah melihat story tersebut
    const storyTrayDataWithViewInfo = storyTrayData.map((story) => {
      const hasViewed = story.Viewers.some(
        (viewer) => viewer.UserId === UserId,
      );

      return {
        ...story.toJSON(),
        hasViewed,
      };
    });

    // Group Story berdasarkan UserId
    const storyTrayDataGrouped = storyTrayDataWithViewInfo.reduce(
      (acc, story) => {
        const userId = story.UserId;
        if (!acc[userId]) {
          acc[userId] = {
            User: story.User,
            Stories: [],
          };
        }
        acc[userId].Stories.push(story);
        return acc;
      },
      {},
    );

    const result = Object.values(storyTrayDataGrouped);

    return result;
  }
}

module.exports = {
  StoryService,
};

// {
//     "data": {
//         "13": {
//             "User": {
//                 "id": 13,
//                 "username": "leehyein",
//                 "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                 "isVerified": true
//             },
//             "Stories": [
//                 {
//                     "id": 3,
//                     "UserId": 13,
//                     "mediaType": "image",
//                     "mediaUrl": "https://i.pinimg.com/736x/c4/ca/5d/c4ca5d1e754ed0bc6f9a1419267d5429.jpg",
//                     "caption": "Lee Hyein ini",
//                     "privacy": "public",
//                     "allowReply": true,
//                     "allowShare": true,
//                     "expiresAt": "2026-03-15T09:19:19.452Z",
//                     "deletedAt": null,
//                     "createdAt": "2026-03-14T09:19:19.451Z",
//                     "updatedAt": "2026-03-14T09:19:19.451Z",
//                     "User": {
//                         "id": 13,
//                         "username": "leehyein",
//                         "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                         "isVerified": true
//                     },
//                     "Viewers": [],
//                     "hasViewed": false
//                 },
//                 {
//                     "id": 2,
//                     "UserId": 13,
//                     "mediaType": "image",
//                     "mediaUrl": "https://i.pinimg.com/736x/c4/ca/5d/c4ca5d1e754ed0bc6f9a1419267d5429.jpg",
//                     "caption": "Lee Hyein ini",
//                     "privacy": "public",
//                     "allowReply": true,
//                     "allowShare": true,
//                     "expiresAt": "2026-03-15T08:24:03.417Z",
//                     "deletedAt": null,
//                     "createdAt": "2026-03-14T08:24:03.400Z",
//                     "updatedAt": "2026-03-14T08:24:03.400Z",
//                     "User": {
//                         "id": 13,
//                         "username": "leehyein",
//                         "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                         "isVerified": true
//                     },
//                     "Viewers": [],
//                     "hasViewed": false
//                 },
//                 {
//                     "id": 1,
//                     "UserId": 13,
//                     "mediaType": "image",
//                     "mediaUrl": "https://i.pinimg.com/736x/c4/ca/5d/c4ca5d1e754ed0bc6f9a1419267d5429.jpg",
//                     "caption": "wew",
//                     "privacy": "public",
//                     "allowReply": true,
//                     "allowShare": true,
//                     "expiresAt": "2026-03-15T08:14:01.873Z",
//                     "deletedAt": null,
//                     "createdAt": "2026-03-14T08:14:01.872Z",
//                     "updatedAt": "2026-03-14T08:14:01.872Z",
//                     "User": {
//                         "id": 13,
//                         "username": "leehyein",
//                         "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                         "isVerified": true
//                     },
//                     "Viewers": [],
//                     "hasViewed": false
//                 }
//             ]
//         }
//     },

// }


// {
//     "success": true,
//     "data": [
//         {
//             "User": {
//                 "id": 3,
//                 "username": "charlie_dev",
//                 "avatar": "https://i.pravatar.cc/150?img=3",
//                 "isVerified": true
//             },
//             "Stories": [
//                 {
//                     "id": 4,
//                     "UserId": 3,
//                     "mediaType": "image",
//                     "mediaUrl": "https://i.pinimg.com/736x/c2/41/9e/c2419e80d1fc5f4531522537c3025c14.jpg",
//                     "caption": "Charlie",
//                     "privacy": "public",
//                     "allowReply": true,
//                     "allowShare": true,
//                     "expiresAt": "2026-03-15T14:19:11.854Z",
//                     "deletedAt": null,
//                     "createdAt": "2026-03-14T14:19:11.844Z",
//                     "updatedAt": "2026-03-14T14:19:11.844Z",
//                     "User": {
//                         "id": 3,
//                         "username": "charlie_dev",
//                         "avatar": "https://i.pravatar.cc/150?img=3",
//                         "isVerified": true
//                     },
//                     "Viewers": [],
//                     "hasViewed": false
//                 }
//             ]
//         },
//         {
//             "User": {
//                 "id": 13,
//                 "username": "leehyein",
//                 "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                 "isVerified": true
//             },
//             "Stories": [
//                 {
//                     "id": 3,
//                     "UserId": 13,
//                     "mediaType": "image",
//                     "mediaUrl": "https://i.pinimg.com/736x/c4/ca/5d/c4ca5d1e754ed0bc6f9a1419267d5429.jpg",
//                     "caption": "Lee Hyein ini",
//                     "privacy": "public",
//                     "allowReply": true,
//                     "allowShare": true,
//                     "expiresAt": "2026-03-15T09:19:19.452Z",
//                     "deletedAt": null,
//                     "createdAt": "2026-03-14T09:19:19.451Z",
//                     "updatedAt": "2026-03-14T09:19:19.451Z",
//                     "User": {
//                         "id": 13,
//                         "username": "leehyein",
//                         "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                         "isVerified": true
//                     },
//                     "Viewers": [],
//                     "hasViewed": false
//                 },
//                 {
//                     "id": 2,
//                     "UserId": 13,
//                     "mediaType": "image",
//                     "mediaUrl": "https://i.pinimg.com/736x/c4/ca/5d/c4ca5d1e754ed0bc6f9a1419267d5429.jpg",
//                     "caption": "Lee Hyein ini",
//                     "privacy": "public",
//                     "allowReply": true,
//                     "allowShare": true,
//                     "expiresAt": "2026-03-15T08:24:03.417Z",
//                     "deletedAt": null,
//                     "createdAt": "2026-03-14T08:24:03.400Z",
//                     "updatedAt": "2026-03-14T08:24:03.400Z",
//                     "User": {
//                         "id": 13,
//                         "username": "leehyein",
//                         "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                         "isVerified": true
//                     },
//                     "Viewers": [],
//                     "hasViewed": false
//                 },
//                 {
//                     "id": 1,
//                     "UserId": 13,
//                     "mediaType": "image",
//                     "mediaUrl": "https://i.pinimg.com/736x/c4/ca/5d/c4ca5d1e754ed0bc6f9a1419267d5429.jpg",
//                     "caption": "wew",
//                     "privacy": "public",
//                     "allowReply": true,
//                     "allowShare": true,
//                     "expiresAt": "2026-03-15T08:14:01.873Z",
//                     "deletedAt": null,
//                     "createdAt": "2026-03-14T08:14:01.872Z",
//                     "updatedAt": "2026-03-14T08:14:01.872Z",
//                     "User": {
//                         "id": 13,
//                         "username": "leehyein",
//                         "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                         "isVerified": true
//                     },
//                     "Viewers": [],
//                     "hasViewed": false
//                 }
//             ]
//         }
//     ],
//     "message": "Get story tray success"
// }