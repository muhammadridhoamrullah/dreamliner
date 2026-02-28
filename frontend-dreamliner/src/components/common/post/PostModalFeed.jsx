import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchPostById } from "../../../store/postSlice";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { FaRegPaperPlane } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegFaceSmile } from "react-icons/fa6";
import dayjs from "../../../utils/utilsDayjs";
import { TiHeartOutline } from "react-icons/ti";
import { TiHeartFullOutline } from "react-icons/ti";

export default function PostModalFeed() {
  const location = useLocation();
  const navigate = useNavigate();
  const { PostId } = useParams();
  const dispatch = useDispatch();
  const {
    loading: loadingPost,
    data: dataPost,
    error: errorPost,
  } = useSelector((state) => state.post);
  console.log(dataPost, "dataPost");
  const [comment, setComment] = useState("");
  console.log(comment, "comment");

  useEffect(() => {
    dispatch(fetchPostById(PostId));
  }, [dispatch, PostId]);

  useEffect(() => {
    if (errorPost) {
      toast.error(errorPost);
    }
  }, [errorPost]);

  useEffect(() => {
    console.log(location, "location PostDetail");
    console.log(location.pathname, "location.pathname PostDetail");
  }, [location.pathname]);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden";

    return () => {
      // Kembalikan scroll saat modal ditutup
      document.body.style.overflow = "auto";
    };
  }, []);

  async function submitCommentHandler(e) {
    e.preventDefault();
    toast.success(comment);
  }

  function countLikes(likesLength) {
    if (likesLength < 1000) {
      return likesLength.toString();
    }

    if (likesLength < 1000000) {
      return (likesLength / 1000).toFixed(1).replace(".0", "") + "K";
    }

    if (likesLength < 1000000000) {
      return (likesLength / 1000000).toFixed(1).replace(".0", "") + "M";
    }

    return (likesLength / 1000000000).toFixed(1).replace(".0", "") + "B";
  }
  const comments =
    dataPost?.Comments?.length > 0
      ? Array.from({ length: 20 }, (_, i) => ({
          ...dataPost.Comments[0],
          id: i + 1, // supaya key unik
        }))
      : [];

  return (
    <div className="bg-black/5 w-full h-screen flex justify-between items-start">
      {/* Awal Bagian Post */}
      <div className=" w-[95%] h-full flex justify-center items-center">
        <div className=" w-220 h-135 flex justify-between items-start rounded-md overflow-hidden">
          {/* Awal Foto */}
          <div className="bg-pink-600 w-[47%] h-full relative">
            <img
              src={
                "https://rare-gallery.com/uploads/posts/327850-TWICE-Jihyo-Feel-Special-8K-iphone-wallpaper.jpg"
              }
              alt={`Foto Post Id ${dataPost?.id}`}
              className="absolute w-full h-full object-cover"
            />
          </div>
          {/* Akhir Foto */}
          {/* Awal Caption, Like, & Comment */}
          {/* Disini pb-2 */}
          <div className="bg-white w-[53%] h-full flex flex-col justify-start items-start  ">
            {/* Awal Profil */}
            <div className="w-full h-[12%] flex justify-between items-center border-b px-2 border-gray-200">
              {/* Awal Foto, Username */}
              <div className="w-fit h-fit flex justify-start items-center gap-2">
                {/* Awal Foto Profil */}
                <div className="w-10 h-10 relative overflow-hidden rounded-full">
                  <img
                    src={dataPost?.Author?.avatar}
                    alt={`Foto Profil ${dataPost?.Author?.username}`}
                    className="absolute w-full h-full object-cover"
                  />
                </div>
                {/* Akhir Foto Profil */}

                {/* Awal Username dan Verified */}
                <div className="w-fit h-fit flex gap-1 items-center">
                  {/* Awal Username */}
                  <span className="font-semibold text-sm">
                    {dataPost?.Author?.username}
                  </span>
                  {/* Akhir Username */}
                  {/* Awal Check Verfied */}
                  {dataPost?.Author?.isVerified && (
                    <MdVerified className="text-blue-500 text-lg" />
                  )}
                  {/* Akhir Check Verfied */}
                </div>
                {/* Akhir Username dan Verified */}
              </div>
              {/* Akhir Foto, Username */}

              {/* Awal Titik Tiga */}
              <div className=" ">
                <BsThreeDots className=" cursor-pointer" />
              </div>
              {/* Akhir Titik Tiga */}
            </div>
            {/* Akhir Profil */}

            {/* Awal Caption dan Comment */}
            <div className=" w-full h-[63%] flex flex-col justify-start items-start px-2">
              {/* Awal Caption */}
              <div className=" w-full h-fit py-2 flex justify-between items-start gap-2">
                {/* Awal Foto Profil */}
                <div className="w-10 h-10 flex justify-center items-center relative overflow-hidden rounded-full">
                  <img
                    src={dataPost?.Author?.avatar}
                    alt={`Foto Profil ${dataPost?.Author?.username}`}
                    className="w-full h-full absolute object-cover"
                  />
                </div>
                {/* Akhir Foto Profil */}

                {/* Awal Teks Caption */}
                <div className="flex-1 flex flex-col gap-2 justify-start items-start text-sm">
                  {/* Awal Username dan Caption */}
                  <p className="leading-snug">
                    {/* Awal Username dan Verified */}
                    <span className="font-semibold inline-flex items-center gap-1 mr-1">
                      {dataPost?.Author?.username}
                      {dataPost?.Author?.isVerified && (
                        <MdVerified className="text-blue-500 text-lg" />
                      )}
                    </span>
                    {dataPost?.caption}
                    {/* Akhir Username dan Verified */}
                  </p>
                  {/* Akhir Username dan Caption */}

                  {/* Awal CreatedAt */}
                  <span className="text-xs text-gray-500">
                    {dayjs(dataPost?.createdAt).fromNow()}
                  </span>
                  {/* Akhir CreatedAt */}
                </div>
                {/* Akhir Teks Caption */}
              </div>
              {/* Akhir Caption */}

              {/* Awal Mapping Comment */}

              <div className=" flex-1 overflow-y-auto pr-1 w-full">
                {dataPost?.Comments?.map((comment) => {
                  return (
                    <div
                      key={comment.id}
                      className="w-full h-fit py-2 flex items-start gap-2 text-sm"
                    >
                      {/* Awal Foto Profil */}
                      <div className="w-10 h-10 relative overflow-hidden rounded-full">
                        <img
                          src={comment.Author.avatar}
                          alt={`Foto Profil ${comment.Author.username}`}
                          className="absolute w-full h-full object-cover"
                        />
                      </div>
                      {/* Akhir Foto Profil */}

                      {/* Awal Teks Comment */}
                      <div className=" flex-1 flex flex-col gap-1 justify-start items-start">
                        {/* Awal Username, Verified, dan Comment */}
                        <p className="leading-snug">
                          {/* Awal Username dan Verified */}
                          <span className="font-semibold inline-flex items-center gap-1 mr-1">
                            {comment.Author.username}
                            {comment.Author.isVerified && (
                              <MdVerified className="text-blue-500 text-lg" />
                            )}
                          </span>
                          {comment.content}
                          {/* Akhir Username dan Verified */}
                        </p>
                        {/* Akhir Username, Verified, dan Comment */}

                        {/* Awal Jam Comment */}
                        <span className="text-xs text-gray-500">
                          {dayjs(comment.createdAt).fromNow()}
                        </span>
                        {/* Akhir Jam Comment */}
                      </div>
                      {/* Akhir Teks Comment */}

                      {/* Awal Icon Like */}
                      <TiHeartOutline className=" cursor-pointer hover:scale-105" />
                      {/* Akhir Icon Like */}
                    </div>
                  );
                })}
              </div>

              {/* Akhir Mapping Comment */}
            </div>
            {/* Awal Caption dan Comment */}

            {/* Awal Like dan Input Comment */}
            <div className=" w-full h-[25%] border-t border-gray-200 flex flex-col justify-between items-start">
              {/* Awal Icon, Like, Comment, Bookmark, Jumlah Like, dan CreatedAt */}
              <div className="flex-2 w-full h-fit flex flex-col justify-between items-start p-2">
                {/* Awal Icon */}
                <div className="flex-1 w-full h-fit flex justify-between items-start">
                  {/* Awal Icon Like, Comment, dan Share */}
                  <div className="flex gap-4">
                    <FaRegHeart className="text-2xl cursor-pointer hover:scale-105" />
                    <FaRegComment className="text-2xl cursor-pointer hover:scale-105" />
                    <FaRegPaperPlane className="text-2xl cursor-pointer hover:scale-105" />
                  </div>
                  {/* Akhir Icon Like, Comment, dan Share */}

                  {/* Awal Icon Bookmark */}
                  <FaRegBookmark className="text-2xl cursor-pointer hover:scale-105" />
                  {/* Akhir Icon Bookmark */}
                </div>
                {/* Akhir Icon */}

                {/* Awal Jumlah Like dan CreatedAt */}

                <div className=" flex-1 w-full flex flex-col justify-start items-start text-sm">
                  {/* Awal Jumlah Like */}
                  <span className="font-semibold">
                    {countLikes(dataPost?.Likes.length)} likes
                  </span>
                  {/* Akhir Jumlah Like */}

                  {/* Awal Waktu Upload */}
                  <span className="text-xs text-gray-500">
                    {dayjs(dataPost?.createdAt).fromNow()}
                  </span>
                  {/* Akhir Waktu Upload */}
                </div>
                {/* Akhir Jumlah Like dan CreatedAt */}
              </div>
              {/* Akhir Icon, Like, Comment, Bookmark, Jumlah Like, dan CreatedAt */}

              {/* Awal Kolom Input Comment */}
              <form
                onSubmit={submitCommentHandler}
                className="flex-1 py-1 px-2 flex  items-center gap-2 border-t-2 border-gray-200 text-sm w-full"
              >
                {/* Awal Icon Smile */}

                <FaRegFaceSmile className="text-2xl cursor-pointer hover:scale-105 transition-transform" />

                {/* Akhir Icon Smile */}

                {/* Awal Input Comment */}
                <textarea
                  name="comment"
                  id="comment"
                  placeholder="Add a Comment ..."
                  rows={1}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="flex-1 resize-none outline-none overflow-y-auto"
                />
                {/* Akhir Input Comment */}

                {/* Awal Button Kirim */}
                <button
                  type="submit"
                  disabled={loadingPost || comment.trim() === ""}
                  className={`font-semibold text-blue-800 ${loadingPost || comment.trim() === "" ? "opacity-50 cursor-not-allowed" : "hover:underline cursor-pointer"} transition-transform`}
                >
                  Kirim
                </button>
                {/* Akhir Button Kirim */}
              </form>
              {/* Akhir Kolom Input Comment */}
            </div>
            {/* Akhir Like dan Input Comment */}
          </div>
          {/* Akhir Caption, Like, & Comment */}
        </div>
      </div>
      {/* Akhir Bagian Post */}

      {/* Awal Button Exit */}
      <div className="w-[5%] text-white py-4">
        <IoMdCloseCircleOutline
          onClick={() => navigate(-1)}
          className="cursor-pointer text-4xl hover:scale-105"
        />
      </div>
      {/* Akhir Button Exit */}
    </div>
  );
}

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
//                  "createdAt": "2026-02-06T08:40:14.006Z",
//             }
//         }
//     ],
//     "Likes": [
//         {
//             "id": 21,
//             "PostId": 10,
//             "UserId": 3,
//             "createdAt": "2026-02-06T08:40:13.947Z",
//             "updatedAt": "2026-02-06T08:40:13.947Z",
//             "deletedAt": null
//         }
//     ]
// }
