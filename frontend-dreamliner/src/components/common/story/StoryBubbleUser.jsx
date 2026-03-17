import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { viewStory } from "../../../store/storySlice";

export default function StoryBubbleUser({ story }) {
  const dispatch = useDispatch();
  let user = story.User;
  let notSeen = story.Stories.some((el) => !el.hasViewed);

  // Cari story pertama yang belum dilihat, atau story pertama jika semua sudah dilihat
  const firstUnseenStory =
    story.Stories.find((el) => !el.hasViewed) || story.Stories[0];
  return (
    <div className="w-24 h-28 flex flex-col  justify-center items-center overflow-hidden shrink-0">
      {/* Awal Profile Picture */}
      <Link
        onClick={() => dispatch(viewStory(firstUnseenStory.id))}
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
