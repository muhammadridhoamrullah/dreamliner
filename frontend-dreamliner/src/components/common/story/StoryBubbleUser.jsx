import { Link } from "react-router-dom";

export default function StoryBubbleUser({ story }) {
  let user = story.User;

  let notSeen = story.Stories.some((el) => !el.hasViewed);

  // Cari story pertama yang belum dilihat, atau story pertama jika semua sudah dilihat
  const firstUnseenStory =
    story.Stories.find((el) => !el.hasViewed) || story.Stories[0];
  console.log("firstUnseenStory", firstUnseenStory);

  return (
    <div className="w-24 h-28 flex flex-col  justify-center items-center overflow-hidden shrink-0">
      {/* Awal Profile Picture */}
      <Link
        to={`/stories/${user.username}/${firstUnseenStory.id}`}
        className={`min-w-22 h-22 shrink-0 ${notSeen ? "bg-linear-to-tr from-yellow-400 via-red-500 to-purple-600" : "bg-gray-300"} rounded-full  relative overflow-hidden flex justify-center items-center`}
      >
        <img
          src={user.avatar}
          alt={`Foto Profil ${user.username}`}
          className="absolute w-20 h-20 object-cover rounded-full border-2 border-white"
        />
      </Link>
      {/* Akhir Profile Picture */}
      {/* Awal Username */}
      <span className="text-sm truncate w-full text-center">
        {user.username}
      </span>
      {/* Akhir Username */}
    </div>
  );
}

// [
//     {
//         "User": {
//             "id": 13,
//             "username": "leehyein",
//             "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//             "isVerified": true
//         },
//         "Stories": [
//             {
//                 "id": 11,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-17T07:52:22.266Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 15,
//                         "UserId": 5,
//                         "createdAt": "2026-03-17T07:56:57.692Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 12,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-17T07:52:40.678Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 14,
//                         "UserId": 5,
//                         "createdAt": "2026-03-17T07:56:53.857Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 13,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-17T07:53:17.323Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 13,
//                         "UserId": 5,
//                         "createdAt": "2026-03-17T07:56:19.661Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 28,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:08:18.619Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 17,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T07:10:30.263Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 29,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:08:36.779Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 18,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T07:10:53.973Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 30,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:08:48.223Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [],
//                 "hasViewed": false
//             },
//             {
//                 "id": 31,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:09:01.603Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [],
//                 "hasViewed": false
//             },
//             {
//                 "id": 32,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:09:12.529Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [],
//                 "hasViewed": false
//             }
//         ]
//     },
//     {
//         "User": {
//             "id": 15,
//             "username": "kimminji",
//             "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//             "isVerified": true
//         },
//         "Stories": [
//             {
//                 "id": 14,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-17T07:53:44.329Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 12,
//                         "UserId": 5,
//                         "createdAt": "2026-03-17T07:56:15.379Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 15,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-17T07:54:00.521Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 11,
//                         "UserId": 5,
//                         "createdAt": "2026-03-17T07:56:11.974Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 16,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-17T07:54:10.272Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 10,
//                         "UserId": 5,
//                         "createdAt": "2026-03-17T07:56:05.186Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 17,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-17T07:54:21.560Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 9,
//                         "UserId": 5,
//                         "createdAt": "2026-03-17T07:55:58.536Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 18,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-17T07:54:30.997Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 8,
//                         "UserId": 5,
//                         "createdAt": "2026-03-17T07:55:54.929Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 19,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-17T07:54:52.336Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 7,
//                         "UserId": 5,
//                         "createdAt": "2026-03-17T07:55:02.097Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 20,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-17T13:25:03.150Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 16,
//                         "UserId": 5,
//                         "createdAt": "2026-03-17T13:25:44.567Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 21,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:05:35.818Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 19,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T07:11:01.951Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 22,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:06:01.917Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 20,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T07:11:22.419Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 23,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:06:11.865Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [],
//                 "hasViewed": false
//             },
//             {
//                 "id": 24,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:06:23.272Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [],
//                 "hasViewed": false
//             },
//             {
//                 "id": 25,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:06:35.247Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [],
//                 "hasViewed": false
//             },
//             {
//                 "id": 26,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:06:50.392Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [],
//                 "hasViewed": false
//             },
//             {
//                 "id": 27,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:07:02.415Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [],
//                 "hasViewed": false
//             }
//         ]
//     }
// ]

// FeedStoryTray Baru
// [
//     {
//         "User": {
//             "id": 13,
//             "username": "leehyein",
//             "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//             "isVerified": true
//         },
//         "Stories": [
//             {
//                 "id": 11,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-17T07:52:22.266Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 15,
//                         "UserId": 5,
//                         "createdAt": "2026-03-17T07:56:57.692Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 12,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-17T07:52:40.678Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 14,
//                         "UserId": 5,
//                         "createdAt": "2026-03-17T07:56:53.857Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 13,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-17T07:53:17.323Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 13,
//                         "UserId": 5,
//                         "createdAt": "2026-03-17T07:56:19.661Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             }
//         ]
//     },
//     {
//         "User": {
//             "id": 15,
//             "username": "kimminji",
//             "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//             "isVerified": true
//         },
//         "Stories": [
//             {
//                 "id": 14,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-17T07:53:44.329Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 12,
//                         "UserId": 5,
//                         "createdAt": "2026-03-17T07:56:15.379Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 15,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-17T07:54:00.521Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 11,
//                         "UserId": 5,
//                         "createdAt": "2026-03-17T07:56:11.974Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 16,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-17T07:54:10.272Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 10,
//                         "UserId": 5,
//                         "createdAt": "2026-03-17T07:56:05.186Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 17,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-17T07:54:21.560Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 9,
//                         "UserId": 5,
//                         "createdAt": "2026-03-17T07:55:58.536Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 18,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-17T07:54:30.997Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 8,
//                         "UserId": 5,
//                         "createdAt": "2026-03-17T07:55:54.929Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 19,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-17T07:54:52.336Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 7,
//                         "UserId": 5,
//                         "createdAt": "2026-03-17T07:55:02.097Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 20,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-17T13:25:03.150Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 16,
//                         "UserId": 5,
//                         "createdAt": "2026-03-17T13:25:44.567Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             }
//         ]
//     }
// ]

// FeedStoryTray

// [
//     {
//         "User": {
//             "id": 13,
//             "username": "leehyein",
//             "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//             "isVerified": true
//         },
//         "Stories": [
//             {
//                 "id": 11,
//                 "UserId": 13,
//                 "mediaType": "image",
//                 "mediaUrl": "https://i.pinimg.com/736x/fc/05/bb/fc05bb99589fc8ce045d84d5673ebcdc.jpg",
//                 "caption": null,
//                 "privacy": "public",
//                 "allowReply": true,
//                 "allowShare": true,
//                 "expiresAt": "2026-03-18T07:52:22.268Z",
//                 "deletedAt": null,
//                 "createdAt": "2026-03-17T07:52:22.266Z",
//                 "updatedAt": "2026-03-17T07:52:22.266Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 15,
//                         "UserId": 5,
//                         "createdAt": "2026-03-17T07:56:57.692Z",
//                         "Viewer": {
//                             "id": 5,
//                             "username": "ridho",
//                             "avatar": "https://i.pravatar.cc/150?img=5",
//                             "isVerified": true
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 12,
//                 "UserId": 13,
//                 "mediaType": "image",
//                 "mediaUrl": "https://i.pinimg.com/736x/c7/3f/55/c73f55b42997538f005a8a8cdc999a85.jpg",
//                 "caption": null,
//                 "privacy": "public",
//                 "allowReply": true,
//                 "allowShare": true,
//                 "expiresAt": "2026-03-18T07:52:40.680Z",
//                 "deletedAt": null,
//                 "createdAt": "2026-03-17T07:52:40.678Z",
//                 "updatedAt": "2026-03-17T07:52:40.678Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 14,
//                         "UserId": 5,
//                         "createdAt": "2026-03-17T07:56:53.857Z",
//                         "Viewer": {
//                             "id": 5,
//                             "username": "ridho",
//                             "avatar": "https://i.pravatar.cc/150?img=5",
//                             "isVerified": true
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 13,
//                 "UserId": 13,
//                 "mediaType": "image",
//                 "mediaUrl": "https://i.pinimg.com/736x/29/c0/4a/29c04a9f9771545b55ee17500c968433.jpg",
//                 "caption": null,
//                 "privacy": "public",
//                 "allowReply": true,
//                 "allowShare": true,
//                 "expiresAt": "2026-03-18T07:53:17.324Z",
//                 "deletedAt": null,
//                 "createdAt": "2026-03-17T07:53:17.323Z",
//                 "updatedAt": "2026-03-17T07:53:17.323Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 13,
//                         "UserId": 5,
//                         "createdAt": "2026-03-17T07:56:19.661Z",
//                         "Viewer": {
//                             "id": 5,
//                             "username": "ridho",
//                             "avatar": "https://i.pravatar.cc/150?img=5",
//                             "isVerified": true
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             }
//         ]
//     },
//     {
//         "User": {
//             "id": 15,
//             "username": "kimminji",
//             "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//             "isVerified": true
//         },
//         "Stories": [
//             {
//                 "id": 14,
//                 "UserId": 15,
//                 "mediaType": "image",
//                 "mediaUrl": "https://i.pinimg.com/1200x/06/5e/af/065eaf1e900867d814b9a915c15e875c.jpg",
//                 "caption": null,
//                 "privacy": "public",
//                 "allowReply": true,
//                 "allowShare": true,
//                 "expiresAt": "2026-03-18T07:53:44.330Z",
//                 "deletedAt": null,
//                 "createdAt": "2026-03-17T07:53:44.329Z",
//                 "updatedAt": "2026-03-17T07:53:44.329Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 12,
//                         "UserId": 5,
//                         "createdAt": "2026-03-17T07:56:15.379Z",
//                         "Viewer": {
//                             "id": 5,
//                             "username": "ridho",
//                             "avatar": "https://i.pravatar.cc/150?img=5",
//                             "isVerified": true
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 15,
//                 "UserId": 15,
//                 "mediaType": "image",
//                 "mediaUrl": "https://i.pinimg.com/736x/61/75/c6/6175c6ffc2272239f183beb0beda0102.jpg",
//                 "caption": null,
//                 "privacy": "public",
//                 "allowReply": true,
//                 "allowShare": true,
//                 "expiresAt": "2026-03-18T07:54:00.521Z",
//                 "deletedAt": null,
//                 "createdAt": "2026-03-17T07:54:00.521Z",
//                 "updatedAt": "2026-03-17T07:54:00.521Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 11,
//                         "UserId": 5,
//                         "createdAt": "2026-03-17T07:56:11.974Z",
//                         "Viewer": {
//                             "id": 5,
//                             "username": "ridho",
//                             "avatar": "https://i.pravatar.cc/150?img=5",
//                             "isVerified": true
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 16,
//                 "UserId": 15,
//                 "mediaType": "image",
//                 "mediaUrl": "https://i.pinimg.com/1200x/37/a0/65/37a065f1bb5842b83ec887fca799a725.jpg",
//                 "caption": null,
//                 "privacy": "public",
//                 "allowReply": true,
//                 "allowShare": true,
//                 "expiresAt": "2026-03-18T07:54:10.275Z",
//                 "deletedAt": null,
//                 "createdAt": "2026-03-17T07:54:10.272Z",
//                 "updatedAt": "2026-03-17T07:54:10.272Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 10,
//                         "UserId": 5,
//                         "createdAt": "2026-03-17T07:56:05.186Z",
//                         "Viewer": {
//                             "id": 5,
//                             "username": "ridho",
//                             "avatar": "https://i.pravatar.cc/150?img=5",
//                             "isVerified": true
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 17,
//                 "UserId": 15,
//                 "mediaType": "image",
//                 "mediaUrl": "https://i.pinimg.com/1200x/36/c2/d7/36c2d7015c6bb7e3734569924b74fcd8.jpg",
//                 "caption": null,
//                 "privacy": "public",
//                 "allowReply": true,
//                 "allowShare": true,
//                 "expiresAt": "2026-03-18T07:54:21.561Z",
//                 "deletedAt": null,
//                 "createdAt": "2026-03-17T07:54:21.560Z",
//                 "updatedAt": "2026-03-17T07:54:21.560Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 9,
//                         "UserId": 5,
//                         "createdAt": "2026-03-17T07:55:58.536Z",
//                         "Viewer": {
//                             "id": 5,
//                             "username": "ridho",
//                             "avatar": "https://i.pravatar.cc/150?img=5",
//                             "isVerified": true
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 18,
//                 "UserId": 15,
//                 "mediaType": "image",
//                 "mediaUrl": "https://i.pinimg.com/736x/5b/18/14/5b181447ae6b0eca0901027eb3e26d59.jpg",
//                 "caption": null,
//                 "privacy": "public",
//                 "allowReply": true,
//                 "allowShare": true,
//                 "expiresAt": "2026-03-18T07:54:30.998Z",
//                 "deletedAt": null,
//                 "createdAt": "2026-03-17T07:54:30.997Z",
//                 "updatedAt": "2026-03-17T07:54:30.997Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 8,
//                         "UserId": 5,
//                         "createdAt": "2026-03-17T07:55:54.929Z",
//                         "Viewer": {
//                             "id": 5,
//                             "username": "ridho",
//                             "avatar": "https://i.pravatar.cc/150?img=5",
//                             "isVerified": true
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 19,
//                 "UserId": 15,
//                 "mediaType": "image",
//                 "mediaUrl": "https://i.pinimg.com/1200x/eb/0a/47/eb0a47703768c80bc77a25fe6f4d1a8b.jpg",
//                 "caption": "My Bini Gweh",
//                 "privacy": "public",
//                 "allowReply": true,
//                 "allowShare": true,
//                 "expiresAt": "2026-03-18T07:54:52.336Z",
//                 "deletedAt": null,
//                 "createdAt": "2026-03-17T07:54:52.336Z",
//                 "updatedAt": "2026-03-17T07:54:52.336Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 7,
//                         "UserId": 5,
//                         "createdAt": "2026-03-17T07:55:02.097Z",
//                         "Viewer": {
//                             "id": 5,
//                             "username": "ridho",
//                             "avatar": "https://i.pravatar.cc/150?img=5",
//                             "isVerified": true
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 20,
//                 "UserId": 15,
//                 "mediaType": "image",
//                 "mediaUrl": "https://i.pinimg.com/736x/92/5a/ce/925ace2febd002be0f8fc91e4b629ce1.jpg",
//                 "caption": null,
//                 "privacy": "public",
//                 "allowReply": true,
//                 "allowShare": true,
//                 "expiresAt": "2026-03-18T13:25:03.168Z",
//                 "deletedAt": null,
//                 "createdAt": "2026-03-17T13:25:03.150Z",
//                 "updatedAt": "2026-03-17T13:25:03.150Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 16,
//                         "UserId": 5,
//                         "createdAt": "2026-03-17T13:25:44.567Z",
//                         "Viewer": {
//                             "id": 5,
//                             "username": "ridho",
//                             "avatar": "https://i.pravatar.cc/150?img=5",
//                             "isVerified": true
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             }
//         ]
//     }
// ]

// Story by username
// {
//     "success": true,
//     "data": {
//         "count": 3,
//         "rows": [
//             {
//                 "id": 5,
//                 "UserId": 13,
//                 "mediaType": "image",
//                 "mediaUrl": "https://i.pinimg.com/736x/4e/3f/5c/4e3f5c2c4583d7babe1b7c5e6cce04c2.jpg",
//                 "caption": null,
//                 "privacy": "public",
//                 "allowReply": true,
//                 "allowShare": true,
//                 "expiresAt": "2026-03-16T09:22:47.629Z",
//                 "deletedAt": null,
//                 "createdAt": "2026-03-15T09:22:47.625Z",
//                 "updatedAt": "2026-03-15T09:22:47.625Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 2,
//                         "UserId": 3,
//                         "createdAt": "2026-03-15T09:36:23.340Z",
//                         "Viewer": {
//                             "id": 3,
//                             "username": "charlie_dev",
//                             "avatar": "https://i.pravatar.cc/150?img=3",
//                             "isVerified": true
//                         }
//                     },
//                     {
//                         "id": 3,
//                         "UserId": 5,
//                         "createdAt": "2026-03-15T09:38:29.189Z",
//                         "Viewer": {
//                             "id": 5,
//                             "username": "ridho",
//                             "avatar": "https://i.pravatar.cc/150?img=5",
//                             "isVerified": true
//                         }
//                     }
//                 ],
//                 "Replies": [],
//                 "hasViewed": true
//             },
//             {
//                 "id": 6,
//                 "UserId": 13,
//                 "mediaType": "image",
//                 "mediaUrl": "https://i.pinimg.com/1200x/c3/1f/d6/c31fd691a6cd2649eac0dae92e7c2b83.jpg",
//                 "caption": null,
//                 "privacy": "public",
//                 "allowReply": true,
//                 "allowShare": true,
//                 "expiresAt": "2026-03-16T09:23:05.620Z",
//                 "deletedAt": null,
//                 "createdAt": "2026-03-15T09:23:05.619Z",
//                 "updatedAt": "2026-03-15T09:23:05.619Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [],
//                 "Replies": [],
//                 "hasViewed": false
//             }
//         ]
//     },
//     "message": "Get story by username success"
// }
