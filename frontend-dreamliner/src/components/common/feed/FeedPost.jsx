import toast from "react-hot-toast";
import { BsThreeDots } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import { LuDot } from "react-icons/lu";
import { countLikes, getDayjs } from "../../../utils/functionHelpers";
import { Link, useLocation } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegPaperPlane } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toggleLikePost } from "../../../store/postSlice";
import { useEffect } from "react";

export default function FeedPost({ data }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { loadingLike, dataLike, errorLike } = useSelector(
    (state) => state.post,
  );

  // useEffect untuk handle error like post
  useEffect(() => {
    if (errorLike) {
      toast.error(errorLike);
    }
  }, [errorLike]);

  return (
    <div className=" w-full h-fit flex flex-col gap-2 justify-start items-start">
      {/* Awal Data User */}
      <div className=" w-full h-12 flex justify-between items-center text-sm">
        {/* Awal Info User */}
        <div className="px-2 flex justify-start items-start gap-2">
          {/* Awal Foto Profil */}
          <div className="w-10 h-10 relative rounded-full overflow-hidden">
            <img
              src={data?.Author?.avatar}
              alt={`Foto Profil ${data?.Author?.username}`}
              className="absolute w-full h-full object-cover"
            />
          </div>
          {/* Akhir Foto Profil */}

          {/* Awal Username, Waktu Upload, dan Tempat */}
          <div className="w-fit h-10 flex flex-col  justify-between items-start">
            {/* Awal Username dan Waktu Upload */}
            <div className="flex justify-start items-center ">
              {/* Awal Username dan Verified */}
              <div className="flex justify-start items-center gap-1">
                {/* Awal Username */}
                <Link
                  to={`/${data?.Author.username}`}
                  className="font-semibold hover:underline"
                >
                  {data?.Author?.username}
                </Link>
                {/* Akhir Username */}
                {/* Awal Verified */}
                {data?.Author?.isVerified && (
                  <MdVerified className="text-blue-500" />
                )}
                {/* Akhir Verified */}
              </div>
              {/* Akhir Username dan Verified */}
              {/* Awal Dot */}
              <LuDot className="text-gray-500" />
              {/* Akhir Dot */}
              {/* Awal Waktu Upload */}
              <span className="text-gray-500 ">
                {getDayjs(data?.createdAt)}
              </span>
              {/* Akhir Waktu Upload */}
            </div>
            {/* Akhir Username dan Waktu Upload */}

            {/* Awal Tempat */}
            <div>Bali, Indonesia</div>
            {/* Akhir Tempat */}
          </div>
          {/* Akhir Username, Waktu Upload, dan Tempat */}
        </div>
        {/* Akhir Info User */}

        {/* Awal Three Dots */}
        <button
          onClick={() => toast.success("Three Dots")}
          className="p-1 rounded-full hover:bg-gray-300 transition-colors duration-300 cursor-pointer"
        >
          <BsThreeDots className="text-lg" />
        </button>
        {/* Akhir Three Dots */}
      </div>
      {/* Akhir Data User */}

      {/* Awal Post */}
      <div className="bg-black w-full h-120 rounded-md overflow-hidden relative">
        <img
          src={data?.imageUrl}
          alt={`Post Id ${data?.id}`}
          className="absolute w-full h-full object-cover"
        />
      </div>
      {/* Akhir Post */}

      {/* Awal Like, Comment, Caption */}
      <div className="text-sm w-full h-fit flex flex-col gap-2 justify-start items-start px-2">
        {/* Awal Icon Like, Komen, Share, Bookmark */}
        <div className=" w-full h-fit flex justify-between items-center">
          {/* Awal Icon Like, Comment, dan Share */}
          <div className="flex jusitfy-start items-center gap-4">
            {/* Awal Icon Like */}
            <button
              className={`flex gap-2 justify-start items-center cursor-pointer ${loadingLike ? "cursor-not-allowed" : "cursor-pointer"} transition-transform hover:scale-110`}
              onClick={() => dispatch(toggleLikePost(data?.id))}
            >
              {data?.isLikedByUserId ? (
                <FaHeart className="text-red-500 text-2xl " />
              ) : (
                <FaRegHeart className=" text-2xl " />
              )}
              {countLikes(data?.Likes?.length || 0)}
            </button>
            {/* Akhir Icon Like */}

            {/* THIS IS */}

            {/* Awal Icon Comment */}
            <Link
              to={`/p/${data?.id}`}
              state={{ backgroundLocation: location }}
              className="flex gap-2 justify-start items-center cursor-pointer"
              onClick={() => toast.success("Comment")}
            >
              <FaRegComment className="text-2xl hover:scale-110 transition-all duration-300" />
              {countLikes(data?.Comments?.length || 0)}
            </Link>
            {/* Akhir Icon Comment */}

            {/* THIS IS */}

            {/* Awal Icon Share */}
            <button
              className="cursor-pointer"
              onClick={() => toast.success("Share")}
            >
              <FaRegPaperPlane className="text-2xl hover:scale-110" />
            </button>
            {/* Akhir Icon Share */}
          </div>
          {/* Akhir Icon Like, Comment, dan Share */}

          {/* Awal Icon Bookmark */}
          <button onClick={() => toast.success("Bookmark")}>
            <FaRegBookmark className="text-2xl" />
          </button>
          {/* Akhir Icon Bookmark */}
        </div>
        {/* Akhir Icon Like, Komen, Share, Bookmark */}

        {/* Awal Username, Verified dan Caption */}
        <div className=" w-full h-fit leading-snug">
          {/* Awal Username dan Verified */}
          <span className="font-semibold inline-flex items-center gap-1 mr-1">
            <Link
              to={`/${data?.Author?.username}`}
              className="hover:underline hover:text-blue-600"
            >
              {data?.Author?.username}
            </Link>
            {data?.Author?.isVerified && (
              <MdVerified className="text-blue-500" />
            )}
          </span>
          {data?.caption}
          {/* Akhir Username dan Verified */}
        </div>
        {/* Akhir Username, Verified dan Caption */}
      </div>
      {/* Akhir Like, Comment, Caption */}
    </div>
  );
}

//  {dataPost?.isLikeByUserId ? (
//                           <FaHeart className="text-red-500 text-2xl " />
//                         ) : (
//                           <FaRegHeart className=" text-2xl " />
//                         )}

// {
//     "id": 10,
//     "UserId": 5,
//     "imageUrl": "https://picsum.photos/600/600?random=10",
//     "caption": "Healthy meal prep 🥗",
//     "createdAt": "2026-02-06T08:40:13.912Z",
//     "updatedAt": "2026-02-06T08:40:13.912Z",
//     "deletedAt": null,
//     "Author": {
//         "id": 5,
//         "username": "ridho",
//         "avatar": "https://i.pravatar.cc/150?img=5",
//         "isVerified": true
//     },
//     "Likes": [
//         {
//             "id": 21,
//             "PostId": 10,
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
//         },
//         {
//             "id": 54,
//             "PostId": 10,
//             "UserId": 13,
//             "createdAt": "2026-03-07T07:32:56.788Z",
//             "updatedAt": "2026-03-07T07:32:56.788Z",
//             "deletedAt": null,
//             "User": {
//                 "id": 13,
//                 "username": "leehyein",
//                 "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                 "isVerified": true
//             }
//         }
//     ],
//     "Comments": [
//         {
//             "id": 12,
//             "PostId": 10,
//             "UserId": 3,
//             "content": "Looks delicious! 🥗",
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
//         },
//         {
//             "id": 20,
//             "PostId": 10,
//             "UserId": 13,
//             "content": "wew",
//             "createdAt": "2026-03-03T15:30:18.984Z",
//             "updatedAt": "2026-03-03T15:30:18.984Z",
//             "deletedAt": null,
//             "Author": {
//                 "id": 13,
//                 "username": "leehyein",
//                 "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                 "isVerified": true,
//                 "createdAt": "2026-02-20T07:33:14.157Z"
//             }
//         },
//         {
//             "id": 21,
//             "PostId": 10,
//             "UserId": 13,
//             "content": "yey",
//             "createdAt": "2026-03-04T06:45:18.312Z",
//             "updatedAt": "2026-03-04T06:45:18.312Z",
//             "deletedAt": null,
//             "Author": {
//                 "id": 13,
//                 "username": "leehyein",
//                 "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                 "isVerified": true,
//                 "createdAt": "2026-02-20T07:33:14.157Z"
//             }
//         },
//         {
//             "id": 23,
//             "PostId": 10,
//             "UserId": 13,
//             "content": "wew",
//             "createdAt": "2026-03-04T15:24:12.860Z",
//             "updatedAt": "2026-03-04T15:24:12.860Z",
//             "deletedAt": null,
//             "Author": {
//                 "id": 13,
//                 "username": "leehyein",
//                 "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                 "isVerified": true,
//                 "createdAt": "2026-02-20T07:33:14.157Z"
//             }
//         },
//         {
//             "id": 27,
//             "PostId": 10,
//             "UserId": 13,
//             "content": "i need a doctor",
//             "createdAt": "2026-03-06T13:44:28.467Z",
//             "updatedAt": "2026-03-06T13:44:28.467Z",
//             "deletedAt": null,
//             "Author": {
//                 "id": 13,
//                 "username": "leehyein",
//                 "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                 "isVerified": true,
//                 "createdAt": "2026-02-20T07:33:14.157Z"
//             }
//         },
//         {
//             "id": 28,
//             "PostId": 10,
//             "UserId": 13,
//             "content": "char",
//             "createdAt": "2026-03-06T15:05:51.909Z",
//             "updatedAt": "2026-03-06T15:05:51.909Z",
//             "deletedAt": null,
//             "Author": {
//                 "id": 13,
//                 "username": "leehyein",
//                 "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                 "isVerified": true,
//                 "createdAt": "2026-02-20T07:33:14.157Z"
//             }
//         },
//         {
//             "id": 30,
//             "PostId": 10,
//             "UserId": 13,
//             "content": "charmaine\n",
//             "createdAt": "2026-03-07T07:33:02.371Z",
//             "updatedAt": "2026-03-07T07:33:02.371Z",
//             "deletedAt": null,
//             "Author": {
//                 "id": 13,
//                 "username": "leehyein",
//                 "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                 "isVerified": true,
//                 "createdAt": "2026-02-20T07:33:14.157Z"
//             }
//         },
//         {
//             "id": 31,
//             "PostId": 10,
//             "UserId": 13,
//             "content": "rapheline",
//             "createdAt": "2026-03-07T07:54:37.397Z",
//             "updatedAt": "2026-03-07T07:54:37.397Z",
//             "deletedAt": null,
//             "Author": {
//                 "id": 13,
//                 "username": "leehyein",
//                 "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                 "isVerified": true,
//                 "createdAt": "2026-02-20T07:33:14.157Z"
//             }
//         },
//         {
//             "id": 32,
//             "PostId": 10,
//             "UserId": 13,
//             "content": "yey",
//             "createdAt": "2026-03-07T07:55:01.046Z",
//             "updatedAt": "2026-03-07T07:55:01.046Z",
//             "deletedAt": null,
//             "Author": {
//                 "id": 13,
//                 "username": "leehyein",
//                 "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                 "isVerified": true,
//                 "createdAt": "2026-02-20T07:33:14.157Z"
//             }
//         },
//         {
//             "id": 34,
//             "PostId": 10,
//             "UserId": 13,
//             "content": "halo",
//             "createdAt": "2026-03-08T07:32:35.207Z",
//             "updatedAt": "2026-03-08T07:32:35.207Z",
//             "deletedAt": null,
//             "Author": {
//                 "id": 13,
//                 "username": "leehyein",
//                 "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                 "isVerified": true,
//                 "createdAt": "2026-02-20T07:33:14.157Z"
//             }
//         }
//     ]
// }
