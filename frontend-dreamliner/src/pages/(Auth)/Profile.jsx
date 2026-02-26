import { TbUsersPlus } from "react-icons/tb";
import { MdVerified } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { publicAPI } from "../../api/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserByUsername } from "../../store/userSlice";
import { PiDotsNineFill } from "react-icons/pi";
import { PiDotsNineBold } from "react-icons/pi";
import { MdSmartDisplay } from "react-icons/md";
import { MdOutlineSmartDisplay } from "react-icons/md";
import { BiSolidUserPin } from "react-icons/bi";
import { BiUserPin } from "react-icons/bi";
import ProfileFeeds from "../../components/common/profile/ProfileFeeds";
import { BsCamera } from "react-icons/bs";

export default function Profile() {
  // State untuk menyimpan data user
  const { username } = useParams();
  const dispatch = useDispatch();
  const {
    loading: lUser,
    error: eUser,
    data: dUser,
  } = useSelector((state) => state.user);

  // state untuk active tab
  const [activeTab, setActiveTab] = useState("posts");

  // useEffect untuk mendapatkan data user berdasarkan username
  useEffect(() => {
    if (username) {
      dispatch(fetchUserByUsername(username));
    }
  }, [dispatch, username]);

  // useEffect untuk menampilkan error jika terjadi error saat mendapatkan data user
  useEffect(() => {
    if (eUser) {
      toast.error(eUser);
    }
  }, [eUser]);

  // Function untuk Bio
  function formatBio(bio) {
    const parts = bio.split(/(@[\w.]+)/g); // Split berdasarkan @username

    return parts.map((part, index) => {
      if (part.startsWith("@")) {
        return (
          <Link
            key={index}
            to={`${part.slice(1)}`}
            className="text-blue-500 cursor-pointer  hover:underline"
          >
            {part}
          </Link>
        );
      }

      return <span key={index}>{part}</span>;
    });
  }

  // Function jumlah post
  function countPosts(posts) {
    return posts.length;
  }

  // Function hitung jumlah followers
  function countFollowersAndFollowing(followLength) {
    if (followLength < 1000) {
      return followLength.toString();
    } else if (followLength < 1000000) {
      return Math.floor(followLength / 1000) + "K";
    } else {
      const millions = (followLength / 1000000).toFixed(1);
      return `${parseFloat(millions)} M`;
    }
  }

  return (
    <div className="bg-white w-full min-h-screen flex justify-center items-start py-6">
      {/* Awal Profile */}
      <div className="w-3/4 h-full flex flex-col gap-10 justify-start items-center ">
        {/* Awal Data User */}
        <div className="w-2/3 h-fit flex flex-col gap-4 justify-center items-center">
          {/* Awal Foto Profile dan Data Diri */}
          <div className="w-full h-fit flex justify-start items-start gap-4">
            {/* Awal Foto Profile */}
            <div className="relative w-36 h-36 rounded-full overflow-hidden shrink-0">
              <img
                src={dUser?.avatar || `assets/images/defaultAvatar.png`}
                alt="Foto Profil"
                className="absolute w-full h-full object-cover "
              />
            </div>
            {/* Akhir Foto Profile */}

            {/* Awal Data User */}
            <div className="flex-1 min-w-0 pt-2 flex flex-col gap-2 justify-start items-start">
              {/* Awal Username */}
              <div className="w-full h-fit flex justify-start items-center gap-2">
                {/* Awal Username */}
                <span className="font-bold text-2xl">{dUser?.username}</span>
                {/* Akhir Username */}

                {/* Awal isVerified? */}
                {dUser?.isVerified && (
                  <MdVerified className="text-blue-500 text-xl" />
                )}
                {/* Akhir isVerified? */}

                {/* Awal Titik Tiga */}
                <BsThreeDots className="text-sm" />

                {/* Akhir Titik Tiga */}
              </div>
              {/* Akhir Username */}

              {/* Awal Full Name */}
              <span>{dUser?.fullName}</span>
              {/* Akhir Full Name */}
              {/* Awal Post, Follower, and Following */}
              <div className="w-full h-fit text-sm flex justify-start items-center gap-3">
                {/* Awal Post */}
                <div className="sw-fit h-fit flex justify-start items-center gap-1">
                  {/* Awal Jumlah Post */}
                  <span className="font-semibold">
                    {countPosts(dUser?.Posts || [])}
                  </span>
                  {/* Akhir Jumlah Post */}

                  {/* Awal Teks Post */}
                  <span>posts</span>
                  {/* Akhir Teks Post */}
                </div>
                {/* Akhir Post */}

                {/* Awal Follower */}
                <div className="w-fit h-fit flex justify-start items-center gap-1">
                  {/* Awal Jumlah Followe */}
                  <span className="font-semibold">
                    {countFollowersAndFollowing(dUser?.Followers.length)}
                  </span>
                  {/* Akhir Jumlah Followe */}

                  {/* Awal Teks Follower */}
                  <span>Follower</span>
                  {/* Akhir Teks Follower */}
                </div>
                {/* Akhir Follower */}

                {/* Awal Following */}
                <div className="w-fit h-fit flex justify-start items-center gap-1">
                  {/* Awal Jumlah Following */}
                  <span className="font-semibold">
                    {countFollowersAndFollowing(dUser?.Followings.length)}
                  </span>
                  {/* Akhir Jumlah Following */}

                  {/* Awal Teks Following */}
                  <span>Following</span>
                  {/* Akhir Teks Following */}
                </div>
                {/* Akhir Following */}
              </div>
              {/* Akhir Post, Follower, and Following */}

              {/* Awal Bio */}
              <div className="w-full h-fit text-sm leading-relaxed whitespace-pre-line">
                {formatBio(dUser?.bio || "")}
              </div>
              {/* Akhir Bio */}
            </div>
            {/* Akhir Data User */}
          </div>
          {/* Akhir Foto Profile dan Data Diri */}

          {/* Awal Button Follow */}
          <div className="w-full h-fit flex justify-center items-center gap-2">
            {/* Awal Button Follow */}
            <button className="text-white font-medium text-sm bg-blue-600 hover:bg-blue-900 w-[92%] h-12  text-center rounded-xl cursor-pointer">
              Follow
            </button>
            {/* Akhir Button Follow */}

            {/* Awal Akun Serupa */}
            <div className="bg-gray-300 hover:bg-gray-400 w-[8%] h-12 flex justify-center items-center rounded-xl">
              <TbUsersPlus className=" text-lg" />
            </div>
            {/* Akhir Akun Serupa */}
          </div>
          {/* Akhir Button Follow */}
        </div>
        {/* Akhir Data User */}

        {/* Awal Feed */}
        {dUser?.Posts.length === 0 ? (
          <div className="w-full h-52 flex flex-col gap-2 justify-center items-center">
            {/* Awal Icon Camera */}
            <BsCamera size={100} />
            {/* Akhir Icon Camera */}

            {/* Awal Teks No Posts Yet */}
            <span className="text-xl font-bold">No posts yet</span>
            {/* Akhir Teks No Posts Yet */}
          </div>
        ) : (
          <div className="w-full h-fit flex flex-col justify-start items-start">
            {/* Awal Render Icon Feed, Reels, and Tags */}
            <div className="w-full h-10 flex justify-around items-center">
              {dUser?.Posts.length > 0 && (
                <button
                  className={`flex-1 flex justify-center items-center border-b-2 cursor-pointer transition-all duration-300 ${activeTab === "posts" ? " border-black" : "border-transparent hover:border-gray-300"}`}
                >
                  {activeTab === "posts" ? (
                    <PiDotsNineFill size={30} />
                  ) : (
                    <PiDotsNineBold size={30} />
                  )}
                </button>
              )}
              {/* {reels.length > 0 && (
              <button
                className={`flex-1 flex justify-center items-center border-b-2 cursor-pointer transition-all duration-300   ${activeTab === "reels" ? " border-black" : "border-transparent hover:border-gray-300"}`}
              >
                {activeTab === "reels" ? (
                  <MdSmartDisplay size={30} />
                ) : (
                  <MdOutlineSmartDisplay size={30} />
                )}
              </button>
            )}
            {tags.length > 0 && (
              <button
                className={`flex-1 flex justify-center items-center border-b-2 cursor-pointer transition-all duration-300 ${activeTab === "tags" ? "border-black" : "border-transparent hover:border-gray-300"}`}
              >
                {activeTab === "tags" ? (
                  <BiSolidUserPin size={30} />
                ) : (
                  <BiUserPin size={30} />
                )}
              </button>
            )} */}
            </div>
            {/* Akhir Render Icon Feed, Reels, and Tags */}

            {/* Awal Render Sesuai Menu */}
            <div className="w-full h-fit overflow-hidden rounded-md">
              {activeTab === "posts" && <ProfileFeeds data={dUser?.Posts} />}
            </div>

            {/* Akhir Render Sesuai Menu */}
          </div>
        )}

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
