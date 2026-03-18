import { getDayjs } from "../../../utils/functionHelpers";
import { MdVerified } from "react-icons/md";

export default function StoryThumbnailPrevNextUser({ tray, onClick }) {
  return (
    <div
      onClick={onClick}
      className=" w-60 h-80 relative rounded-xl overflow-hidden "
    >
      {/* Awal Background Story */}
      <img
        src={tray.Stories[0].mediaUrl}
        alt={`Story User ${tray.User.username}`}
        className="absolute w-full h-full object-cover "
      />
      {/* Akhir Background Story */}

      {/* Awal Image dan Username */}
      <div className="bg-black/50 absolute w-full h-full flex flex-col justify-center items-center gap-2 ">
        {/* Awal Image */}
        <div className="w-22 h-22 bg-black rounded-full overflow-hidden relative">
          <img
            src={tray.User.avatar}
            alt={`Foto Profil ${tray.User.username}`}
            className="absolute w-full h-full object-cover"
          />
        </div>
        {/* Akhir Image */}

        {/* Awal Username */}
        <div className="flex flex-col justify-center items-center gap-1">
          <div className="flex items-center gap-1">
            <span className="font-semibold">{tray.User.username}</span>
            {tray.User.isVerified && <MdVerified className="text-blue-500" />}
          </div>
          <span className="text-xs">{getDayjs(tray.latestCreatedAt)}</span>
        </div>
        {/* Akhir Username */}
      </div>
      {/* Akhir Image dan Username */}
    </div>
  );
}

// {
//     "User": {
//         "id": 13,
//         "username": "leehyein",
//         "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//         "isVerified": true
//     },
//     "Stories": [
//         {
//             "id": 28,
//             "UserId": 13,
//             "deletedAt": null,
//             "createdAt": "2026-03-18T07:08:18.619Z",
//             "mediaUrl": "https://i.pinimg.com/1200x/56/e0/15/56e01512689b2b5fa6ae998598f27507.jpg",
//             "User": {
//                 "id": 13,
//                 "username": "leehyein",
//                 "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                 "isVerified": true
//             },
//             "Viewers": [
//                 {
//                     "id": 17,
//                     "UserId": 5,
//                     "createdAt": "2026-03-18T07:10:30.263Z",
//                     "Viewer": {
//                         "id": 5
//                     }
//                 }
//             ],
//             "hasViewed": true
//         },
//         {
//             "id": 29,
//             "UserId": 13,
//             "deletedAt": null,
//             "createdAt": "2026-03-18T07:08:36.779Z",
//             "mediaUrl": "https://i.pinimg.com/736x/b3/38/0a/b3380a8141dee42ce4def014f78c790d.jpg",
//             "User": {
//                 "id": 13,
//                 "username": "leehyein",
//                 "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                 "isVerified": true
//             },
//             "Viewers": [
//                 {
//                     "id": 18,
//                     "UserId": 5,
//                     "createdAt": "2026-03-18T07:10:53.973Z",
//                     "Viewer": {
//                         "id": 5
//                     }
//                 }
//             ],
//             "hasViewed": true
//         },
//         {
//             "id": 30,
//             "UserId": 13,
//             "deletedAt": null,
//             "createdAt": "2026-03-18T07:08:48.223Z",
//             "mediaUrl": "https://i.pinimg.com/1200x/db/8e/d5/db8ed5e9ebce9cdc79e700dc7d443182.jpg",
//             "User": {
//                 "id": 13,
//                 "username": "leehyein",
//                 "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                 "isVerified": true
//             },
//             "Viewers": [
//                 {
//                     "id": 21,
//                     "UserId": 5,
//                     "createdAt": "2026-03-18T07:27:16.960Z",
//                     "Viewer": {
//                         "id": 5
//                     }
//                 }
//             ],
//             "hasViewed": true
//         },
//         {
//             "id": 31,
//             "UserId": 13,
//             "deletedAt": null,
//             "createdAt": "2026-03-18T07:09:01.603Z",
//             "mediaUrl": "https://i.pinimg.com/736x/48/20/47/4820477dd4345976b7e16e636a2c9288.jpg",
//             "User": {
//                 "id": 13,
//                 "username": "leehyein",
//                 "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                 "isVerified": true
//             },
//             "Viewers": [
//                 {
//                     "id": 22,
//                     "UserId": 5,
//                     "createdAt": "2026-03-18T07:27:19.685Z",
//                     "Viewer": {
//                         "id": 5
//                     }
//                 }
//             ],
//             "hasViewed": true
//         },
//         {
//             "id": 32,
//             "UserId": 13,
//             "deletedAt": null,
//             "createdAt": "2026-03-18T07:09:12.529Z",
//             "mediaUrl": "https://i.pinimg.com/1200x/1c/80/2d/1c802db640cefa5fb37d375d7ea16e92.jpg",
//             "User": {
//                 "id": 13,
//                 "username": "leehyein",
//                 "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                 "isVerified": true
//             },
//             "Viewers": [
//                 {
//                     "id": 23,
//                     "UserId": 5,
//                     "createdAt": "2026-03-18T07:27:22.181Z",
//                     "Viewer": {
//                         "id": 5
//                     }
//                 }
//             ],
//             "hasViewed": true
//         },
//         {
//             "id": 33,
//             "UserId": 13,
//             "deletedAt": null,
//             "createdAt": "2026-03-18T07:51:25.980Z",
//             "mediaUrl": "https://i.pinimg.com/736x/5f/16/29/5f1629b93259a2d089bda589880a2eef.jpg",
//             "User": {
//                 "id": 13,
//                 "username": "leehyein",
//                 "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                 "isVerified": true
//             },
//             "Viewers": [
//                 {
//                     "id": 29,
//                     "UserId": 5,
//                     "createdAt": "2026-03-18T07:51:45.317Z",
//                     "Viewer": {
//                         "id": 5
//                     }
//                 }
//             ],
//             "hasViewed": true
//         },
//         {
//             "id": 34,
//             "UserId": 13,
//             "deletedAt": null,
//             "createdAt": "2026-03-18T07:51:33.817Z",
//             "mediaUrl": "https://i.pinimg.com/1200x/7e/da/12/7eda12799f30b111e709216183ef6b67.jpg",
//             "User": {
//                 "id": 13,
//                 "username": "leehyein",
//                 "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                 "isVerified": true
//             },
//             "Viewers": [
//                 {
//                     "id": 30,
//                     "UserId": 5,
//                     "createdAt": "2026-03-18T07:52:11.066Z",
//                     "Viewer": {
//                         "id": 5
//                     }
//                 }
//             ],
//             "hasViewed": true
//         },
//         {
//             "id": 35,
//             "UserId": 13,
//             "deletedAt": null,
//             "createdAt": "2026-03-18T08:00:58.295Z",
//             "mediaUrl": "https://i.pinimg.com/736x/58/39/70/5839700ba5a851eebbb74b98bfb06554.jpg",
//             "User": {
//                 "id": 13,
//                 "username": "leehyein",
//                 "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                 "isVerified": true
//             },
//             "Viewers": [
//                 {
//                     "id": 31,
//                     "UserId": 5,
//                     "createdAt": "2026-03-18T08:02:15.631Z",
//                     "Viewer": {
//                         "id": 5
//                     }
//                 }
//             ],
//             "hasViewed": true
//         },
//         {
//             "id": 36,
//             "UserId": 13,
//             "deletedAt": null,
//             "createdAt": "2026-03-18T08:01:11.275Z",
//             "mediaUrl": "https://i.pinimg.com/736x/59/f0/f5/59f0f533bd8590b86e25d1f17b468b60.jpg",
//             "User": {
//                 "id": 13,
//                 "username": "leehyein",
//                 "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                 "isVerified": true
//             },
//             "Viewers": [
//                 {
//                     "id": 32,
//                     "UserId": 5,
//                     "createdAt": "2026-03-18T08:02:24.844Z",
//                     "Viewer": {
//                         "id": 5
//                     }
//                 }
//             ],
//             "hasViewed": true
//         },
//         {
//             "id": 37,
//             "UserId": 13,
//             "deletedAt": null,
//             "createdAt": "2026-03-18T08:01:21.405Z",
//             "mediaUrl": "https://i.pinimg.com/736x/d1/d9/02/d1d902385d9c012f6408789558011f79.jpg",
//             "User": {
//                 "id": 13,
//                 "username": "leehyein",
//                 "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                 "isVerified": true
//             },
//             "Viewers": [
//                 {
//                     "id": 33,
//                     "UserId": 5,
//                     "createdAt": "2026-03-18T08:02:31.222Z",
//                     "Viewer": {
//                         "id": 5
//                     }
//                 }
//             ],
//             "hasViewed": true
//         },
//         {
//             "id": 38,
//             "UserId": 13,
//             "deletedAt": null,
//             "createdAt": "2026-03-18T08:01:32.975Z",
//             "mediaUrl": "https://i.pinimg.com/736x/64/d2/dd/64d2dd1eb204ce1d5f9f840304cbc7c1.jpg",
//             "User": {
//                 "id": 13,
//                 "username": "leehyein",
//                 "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                 "isVerified": true
//             },
//             "Viewers": [
//                 {
//                     "id": 34,
//                     "UserId": 5,
//                     "createdAt": "2026-03-18T08:02:36.272Z",
//                     "Viewer": {
//                         "id": 5
//                     }
//                 }
//             ],
//             "hasViewed": true
//         },
//         {
//             "id": 39,
//             "UserId": 13,
//             "deletedAt": null,
//             "createdAt": "2026-03-18T08:07:16.363Z",
//             "mediaUrl": "https://i.pinimg.com/1200x/48/3d/df/483ddf4f108e4c5b16d1e0c002d7c453.jpg",
//             "User": {
//                 "id": 13,
//                 "username": "leehyein",
//                 "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                 "isVerified": true
//             },
//             "Viewers": [
//                 {
//                     "id": 35,
//                     "UserId": 5,
//                     "createdAt": "2026-03-18T08:11:12.253Z",
//                     "Viewer": {
//                         "id": 5
//                     }
//                 }
//             ],
//             "hasViewed": true
//         }
//     ],
//     "hasUnSeen": false,
//     "latestCreatedAt": "2026-03-18T08:07:16.363Z"
// }
