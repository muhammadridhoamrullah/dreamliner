import { useLoaderData } from "react-router-dom";
import ProfileHeader from "../../components/common/profile/ProfileHeader";
import ProfileContent from "../../components/common/profile/ProfileContent";

export default function Profile({ data }) {
  const dataFindUser = useLoaderData();
  const userData = dataFindUser || data;

  return (
    <div className="bg-white w-full min-h-screen flex justify-center items-start py-6">
      {/* Awal Profile */}
      <div className="w-3/4 h-full flex flex-col gap-10 justify-start items-center ">
        {/* Awal Data User */}
        <ProfileHeader dataFindUser={userData} />
        {/* Akhir Data User */}

        {/* Awal Feed */}
        <ProfileContent dataFindUser={userData} />

        {/* Akhir Feed */}
      </div>
      {/* Akhir Profile */}
    </div>
  );
}

// {
//     "id": 5,
//     "username": "ridho",
//     "email": "mridhoamrullah99@gmail.com",
//     "fullName": "Eve Johnson",
//     "bio": "Fitness Coach 💪 | Healthy lifestyle",
//     "avatar": "https://i.pravatar.cc/150?img=5",
//     "isVerified": true,
//     "createdAt": "2026-02-06T08:40:13.077Z",
//     "deletedAt": null,
//     "Posts": [
//         {
//             "id": 9,
//             "UserId": 5,
//             "imageUrl": "https://picsum.photos/600/600?random=9",
//             "caption": "Morning workout routine 💪 #fitness #workout",
//             "createdAt": "2026-02-06T08:40:13.912Z",
//             "updatedAt": "2026-02-06T08:40:13.912Z",
//             "deletedAt": null
//         },
//         {
//             "id": 10,
//             "UserId": 5,
//             "imageUrl": "https://picsum.photos/600/600?random=10",
//             "caption": "Healthy meal prep 🥗",
//             "createdAt": "2026-02-06T08:40:13.912Z",
//             "updatedAt": "2026-02-06T08:40:13.912Z",
//             "deletedAt": null
//         }
//     ],
//     "Comments": [
//         {
//             "id": 5,
//             "PostId": 3,
//             "UserId": 5,
//             "content": "Love the colors",
//             "createdAt": "2026-02-06T08:40:14.006Z",
//             "updatedAt": "2026-02-06T08:40:14.006Z",
//             "deletedAt": null
//         }
//     ],
//     "Likes": [
//         {
//             "id": 8,
//             "PostId": 3,
//             "UserId": 5,
//             "createdAt": "2026-02-06T08:40:13.947Z",
//             "updatedAt": "2026-02-06T08:40:13.947Z",
//             "deletedAt": null
//         }
//     ],
//     "Followers": [
//         {
//             "id": 2,
//             "username": "bob_smith",
//             "email": "bob@example.com",
//             "password": "$2b$10$buQze9uSO/pa2PPjKduUB.2wCI9Kedszq076dvezv3j1cp6z6Z3Le",
//             "fullName": "Bob Smith",
//             "bio": "Photographer 📸 | Nature lover 🌲",
//             "avatar": "https://i.pravatar.cc/150?img=2",
//             "isVerified": false,
//             "createdAt": "2026-02-06T08:40:13.077Z",
//             "updatedAt": "2026-02-06T08:40:13.077Z",
//             "deletedAt": null
//         },
//         {
//             "id": 3,
//             "username": "charlie_dev",
//             "email": "charlie@example.com",
//             "password": "$2b$10$bLpF/073f.JvTiReO/fze.AvydW4GVB5GhvrVN4SdQxHTaxj/ZIuO",
//             "fullName": "Charlie Developer",
//             "bio": "Full Stack Developer 💻 | Tech geek",
//             "avatar": "https://i.pravatar.cc/150?img=3",
//             "isVerified": true,
//             "createdAt": "2026-02-06T08:40:13.077Z",
//             "updatedAt": "2026-02-06T08:40:13.077Z",
//             "deletedAt": null
//         }
//     ],
//     "Followings": [
//         {
//             "id": 2,
//             "username": "bob_smith",
//             "email": "bob@example.com",
//             "password": "$2b$10$buQze9uSO/pa2PPjKduUB.2wCI9Kedszq076dvezv3j1cp6z6Z3Le",
//             "fullName": "Bob Smith",
//             "bio": "Photographer 📸 | Nature lover 🌲",
//             "avatar": "https://i.pravatar.cc/150?img=2",
//             "isVerified": false,
//             "createdAt": "2026-02-06T08:40:13.077Z",
//             "updatedAt": "2026-02-06T08:40:13.077Z",
//             "deletedAt": null
//         },
//         {
//             "id": 3,
//             "username": "charlie_dev",
//             "email": "charlie@example.com",
//             "password": "$2b$10$bLpF/073f.JvTiReO/fze.AvydW4GVB5GhvrVN4SdQxHTaxj/ZIuO",
//             "fullName": "Charlie Developer",
//             "bio": "Full Stack Developer 💻 | Tech geek",
//             "avatar": "https://i.pravatar.cc/150?img=3",
//             "isVerified": true,
//             "createdAt": "2026-02-06T08:40:13.077Z",
//             "updatedAt": "2026-02-06T08:40:13.077Z",
//             "deletedAt": null
//         },
//         {
//             "id": 4,
//             "username": "diana_art",
//             "email": "diana@example.com",
//             "password": "$2b$10$xQ14E.IEBCjhATyXYif6buVUhphGZN52xW1pmTII8u9leuhPC9lr6",
//             "fullName": "Diana Artist",
//             "bio": "Digital Artist 🎨 | Creative soul",
//             "avatar": "https://i.pravatar.cc/150?img=4",
//             "isVerified": false,
//             "createdAt": "2026-02-06T08:40:13.077Z",
//             "updatedAt": "2026-02-06T08:40:13.077Z",
//             "deletedAt": null
//         }
//     ],
//     "Notifications": [
//         {
//             "id": 8,
//             "UserId": 5,
//             "type": "comment",
//             "content": "charlie_dev commented on your post",
//             "isRead": true,
//             "createdAt": "2026-02-06T08:40:14.060Z",
//             "updatedAt": "2026-02-06T08:40:14.060Z",
//             "deletedAt": null
//         }
//     ]
// }

// dataFollowUser
// {
//     "success": true,
//     "data": {
//         "isFollowing": true,
//         "message": "Follow user success"
//     },
//     "message": "You are now following ridho"
// }
