import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { countLikes } from "../../../utils/functionHelpers";

export default function FeedExplore({ data }) {
  const location = useLocation();
  const { dataUserLogin } = useSelector((state) => state.user);
  return (
    <Link
      to={dataUserLogin ? `/p/${data.id}` : "/auth/login"}
      state={{
        backgroundLocation: location,
      }}
      className="block w-full aspect-square overflow-hidden relative group cursor-pointer"
    >
      {/* Awal Foto Postingan */}
      <img
        src={data?.imageUrl}
        alt={`Postingan ID ${data?.id}`}
        className="absolute w-full h-full object-cover "
      />
      {/* Akhir Foto Postingan */}

      {/* Awal Overlay */}
      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out flex justify-center items-center text-white font-semibold text-lg gap-4">
        {/* Awal Like */}
        <div className="flex justify-start items-center gap-2">
          <FaHeart size={24} />
          {countLikes(data?.Likes?.length)}
        </div>
        {/* Akhir Like */}

        {/* Awal Comment */}
        <div className="flex justify-start items-center gap-2">
          <FaComment size={24} />
          {countLikes(data?.Comments?.length)}
        </div>

        {/* Akhir Comment */}
      </div>
      {/* Akhir Overlay */}
    </Link>
  );
}

// {
//     "id": 7,
//     "UserId": 4,
//     "imageUrl": "https://picsum.photos/600/600?random=7",
//     "caption": "New artwork finished 🎨 #art #digitalart",
//     "createdAt": "2026-02-06T08:40:13.912Z",
//     "updatedAt": "2026-02-06T08:40:13.912Z",
//     "deletedAt": null,
//     "Author": {
//         "id": 4,
//         "username": "diana_art",
//         "avatar": "https://i.pravatar.cc/150?img=4",
//         "isVerified": false
//     },
//     "Likes": [
//         {
//             "id": 15,
//             "PostId": 7,
//             "UserId": 1,
//             "createdAt": "2026-02-06T08:40:13.947Z",
//             "updatedAt": "2026-02-06T08:40:13.947Z",
//             "deletedAt": null,
//             "User": {
//                 "id": 1,
//                 "username": "alice_wonder",
//                 "avatar": "https://i.pravatar.cc/150?img=1",
//                 "isVerified": true
//             }
//         },
//         {
//             "id": 16,
//             "PostId": 7,
//             "UserId": 3,
//             "createdAt": "2026-02-06T08:40:13.947Z",
//             "updatedAt": "2026-02-06T08:40:13.947Z",
//             "deletedAt": null,
//             "User": {
//                 "id": 3,
//                 "username": "charlie_dev",
//                 "avatar": "https://i.pravatar.cc/150?img=3",
//                 "isVerified": true
//             }
//         }
//     ],
//     "Comments": [
//         {
//             "id": 8,
//             "PostId": 7,
//             "UserId": 1,
//             "content": "This is stunning! 🎨",
//             "createdAt": "2026-02-06T08:40:14.006Z",
//             "updatedAt": "2026-02-06T08:40:14.006Z",
//             "deletedAt": null,
//             "Author": {
//                 "id": 1,
//                 "username": "alice_wonder",
//                 "avatar": "https://i.pravatar.cc/150?img=1",
//                 "isVerified": true,
//                 "createdAt": "2026-02-06T08:40:13.076Z"
//             }
//         },
//         {
//             "id": 9,
//             "PostId": 7,
//             "UserId": 3,
//             "content": "Your art is incredible",
//             "createdAt": "2026-02-06T08:40:14.006Z",
//             "updatedAt": "2026-02-06T08:40:14.006Z",
//             "deletedAt": null,
//             "Author": {
//                 "id": 3,
//                 "username": "charlie_dev",
//                 "avatar": "https://i.pravatar.cc/150?img=3",
//                 "isVerified": true,
//                 "createdAt": "2026-02-06T08:40:13.077Z"
//             }
//         }
//     ]
// }
