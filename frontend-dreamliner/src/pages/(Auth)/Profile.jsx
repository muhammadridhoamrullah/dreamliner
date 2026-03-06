import { TbUsersPlus } from "react-icons/tb";
import { MdVerified } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import {
  Link,
  useLoaderData,
  useParams,
  useRevalidator,
} from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { publicAPI } from "../../api/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserByUsername,
  followUser,
  followUserReset,
  userLogin,
} from "../../store/userSlice";
import { PiDotsNineFill } from "react-icons/pi";
import { PiDotsNineBold } from "react-icons/pi";
import { MdSmartDisplay } from "react-icons/md";
import { MdOutlineSmartDisplay } from "react-icons/md";
import { BiSolidUserPin } from "react-icons/bi";
import { BiUserPin } from "react-icons/bi";
import { BsGearWide } from "react-icons/bs";
import { AiOutlineLoading } from "react-icons/ai";
import ProfileFeeds from "../../components/common/profile/ProfileFeeds";
import { BsCamera } from "react-icons/bs";
import {
  countFollowersAndFollowing,
  countPosts,
} from "../../utils/functionHelpers";
import LoadingSkeleton from "../../components/common/LoadingSkeleton";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import AvatarPreview from "../../components/common/AvatarPreview";

export default function Profile() {
  const dataFindUser = useLoaderData();
  console.log(dataFindUser, "dataFromLoader");
  const { revalidate } = useRevalidator();

  // State untuk menyimpan data user
  const { username } = useParams();
  const dispatch = useDispatch();

  // const { loadingFindUser, errorFindUser, dataFindUser } = useSelector(
  //   (state) => state.user,
  // );

  const { loadingFollowUser, errorFollowUser, dataFollowUser } = useSelector(
    (state) => state.user,
  );
  console.log(dataFollowUser, "dataFollowUser");

  const { dataUserLogin, loadingUserLogin, errorUserLogin } = useSelector(
    (state) => state.user,
  );

  console.log(dataUserLogin, "dataUserLogin di Profile");

  // state untuk active tab
  const [activeTab, setActiveTab] = useState("posts");

  // variabel untuk cek apakah user yang sedang login sama dengan user yang sedang dilihat
  const isMe = dataFindUser?.isMine;

  // useEffect untuk mendapatkan data user berdasarkan username
  // useEffect(() => {
  //   if (username && (!dataFindUser || dataFindUser.username !== username)) {
  //     dispatch(fetchUserByUsername(username));
  //   }
  // }, [dispatch, username, dataFindUser]);

  // useEffect untuk menampilkan error jika terjadi error saat mendapatkan data user
  // useEffect(() => {
  //   if (errorFindUser) {
  //     toast.error(errorFindUser);
  //   }
  // }, [errorFindUser]);

  // useEffect untuk menampilkan error jika terjadi error saat follow/unfollow user
  useEffect(() => {
    if (errorFollowUser) {
      toast.error(errorFollowUser);
    }
  }, [errorFollowUser]);

  // useEffect untuk menampilkan pesan sukses saat follow/unfollow user
  useEffect(() => {
    if (dataFollowUser) {
      toast.success(dataFollowUser.message);

      revalidate();
      dispatch(followUserReset());
    }
  }, [dataFollowUser]);

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

  // Function untuk cek apakah belum follow, sudah follow, atau belum follback
  const followStatus = useMemo(() => {
    if (!dataUserLogin) {
      return "Follow";
    }

    // Am I following this person?
    const isFollowing = dataFindUser?.Followers?.some(
      (follower) => follower?.id === dataUserLogin?.id,
    );

    // Is this person following me?
    const isFollowedBy = dataFindUser?.Followings?.some(
      (following) => following?.id === dataUserLogin?.id,
    );

    if (isFollowing && isFollowedBy) {
      return "Following"; // Mutual
    } else if (isFollowing) {
      return "Following";
    } else if (isFollowedBy) {
      return "Follow Back";
    } else {
      return "Follow";
    }
  }, [dataFindUser, dataUserLogin]);

  const isFollowing = followStatus === "Following";
  console.log(isFollowing, "isFollowing");

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
              <AvatarPreview
                src={dataFindUser?.avatar || "assets/images/defaultAvatar.png"}
                className="w-full h-full object-cover "
              />
            </div>
            {/* Akhir Foto Profile */}

            {/* Awal Data User */}
            <div className="flex-1 min-w-0 pt-2 flex flex-col gap-2 justify-start items-start">
              {/* Awal Username */}
              <div className="w-full h-fit flex justify-start items-center gap-2">
                {/* Awal Username */}
                <span className="font-bold text-2xl">
                  {dataFindUser?.username}
                </span>
                {/* Akhir Username */}

                {/* Awal isVerified? */}
                {dataFindUser?.isVerified && (
                  <MdVerified className="text-blue-500 text-xl" />
                )}
                {/* Akhir isVerified? */}

                {/* Awal Titik Tiga */}
                {isMe ? (
                  <button
                    className="cursor-pointer"
                    onClick={() => toast.success("Settings")}
                  >
                    <BsGearWide className="text-sm" />
                  </button>
                ) : (
                  <button
                    className="cursor-pointer"
                    onClick={() => toast.success("Three Dots")}
                  >
                    <BsThreeDots className="text-sm" />
                  </button>
                )}

                {/* Akhir Titik Tiga */}
              </div>
              {/* Akhir Username */}

              {/* Awal Full Name */}
              <span>{dataFindUser?.fullName}</span>
              {/* Akhir Full Name */}
              {/* Awal Post, Follower, and Following */}
              <div className="w-full h-fit text-sm flex justify-start items-center gap-3">
                {/* Awal Post */}
                <div className="sw-fit h-fit flex justify-start items-center gap-1">
                  {/* Awal Jumlah Post */}
                  <span className="font-semibold">
                    {countPosts(dataFindUser?.Posts || [])}
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
                    {countFollowersAndFollowing(dataFindUser?.Followers.length)}
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
                    {countFollowersAndFollowing(
                      dataFindUser?.Followings.length,
                    )}
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
                {formatBio(dataFindUser?.bio || "")}
              </div>
              {/* Akhir Bio */}
            </div>
            {/* Akhir Data User */}
          </div>
          {/* Akhir Foto Profile dan Data Diri */}

          {/* Awal Button Follow / Edit Profile */}

          <div className="w-full h-fit flex justify-center items-center gap-2 font-medium text-sm">
            {isMe ? (
              <>
                {/* Awal Button Edit Profile */}
                <button className="bg-gray-300 hover:bg-gray-400 cursor-pointer w-full h-12 rounded-xl">
                  Edit Profile
                </button>
                {/* Akhir Button Edit Profile */}

                {/* Awal Button Lihat Arsip */}
                <button className="bg-gray-300 hover:bg-gray-400 cursor-pointer w-full h-12 rounded-xl">
                  Lihat Arsip
                </button>
                {/* Akhir Button Lihat Arsip */}
              </>
            ) : (
              <>
                {/* Awal Button Follow */}
                <button
                  disabled={loadingFollowUser}
                  onClick={() => dispatch(followUser(dataFindUser?.username))}
                  className={`   w-[92%] h-12 rounded-xl cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-500 ease-in-out ${isFollowing ? "bg-gray-300 hover:bg-gray-400 text-black" : "bg-blue-600 hover:bg-blue-900 text-white"} `}
                >
                  {loadingFollowUser ? (
                    <AiOutlineLoading
                      size={20}
                      className="animate-spin mx-auto"
                    />
                  ) : (
                    followStatus
                  )}
                </button>
                {/* Akhir Button Follow */}

                {/* Awal Akun Serupa */}
                <div className="bg-gray-300 hover:bg-gray-400 w-[8%] h-12 flex justify-center items-center rounded-xl">
                  <TbUsersPlus className=" text-lg" />
                </div>
                {/* Akhir Akun Serupa */}
              </>
            )}
          </div>

          {/* Akhir Button Follow / Edit Profile */}
        </div>
        {/* Akhir Data User */}

        {/* Awal Feed */}
        {dataFindUser?.Posts.length === 0 ? (
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
              {dataFindUser?.Posts.length > 0 && (
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
            </div>
            {/* Akhir Render Icon Feed, Reels, and Tags */}

            {/* Awal Render Sesuai Menu */}
            <div className="w-full h-fit overflow-hidden rounded-md">
              {activeTab === "posts" && (
                <ProfileFeeds data={dataFindUser?.Posts} />
              )}
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

// dataFollowUser
// {
//     "success": true,
//     "data": {
//         "isFollowing": true,
//         "message": "Follow user success"
//     },
//     "message": "You are now following ridho"
// }
