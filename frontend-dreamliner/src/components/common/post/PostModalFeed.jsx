import { useEffect } from "react";
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

export default function PostModalFeed() {
  const location = useLocation();
  const navigate = useNavigate();
  const { PostId } = useParams();
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.post);
  console.log(data, "data");

  useEffect(() => {
    dispatch(fetchPostById(PostId));
  }, [dispatch, PostId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

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
  return (
    <div className="bg-black/5 w-full h-screen flex justify-between items-start">
      {/* Awal Bagian Post */}
      <div className=" w-[95%] h-full flex justify-center items-center">
        <div className=" w-220 h-135 flex justify-between items-start rounded-xl overflow-hidden">
          {/* Awal Foto */}
          <div className="bg-pink-600 w-[47%] h-full relative">
            <img
              src={
                "https://rare-gallery.com/uploads/posts/327850-TWICE-Jihyo-Feel-Special-8K-iphone-wallpaper.jpg"
              }
              alt={`Foto Post Id ${data?.id}`}
              className="absolute w-full h-full object-cover"
            />
          </div>
          {/* Akhir Foto */}
          {/* Awal Caption, Like, & Comment */}
          <div className="bg-white w-[53%] h-full flex flex-col justify-start items-start pb-2 px-2">
            {/* Awal Profil */}
            <div className="w-full h-[10%] flex justify-between items-center">
              {/* Awal Foto, Username */}
              <div className="w-fit h-fit flex justify-start items-center gap-2">
                {/* Awal Foto Profil */}
                <div className="w-10 h-10 relative overflow-hidden rounded-full">
                  <img
                    src={data?.Author?.avatar}
                    alt={`Foto Profil ${data?.Author?.username}`}
                    className="absolute w-full h-full object-cover"
                  />
                </div>
                {/* Akhir Foto Profil */}

                {/* Awal Username dan Verified */}
                <div className="w-fit h-fit flex gap-1 items-center">
                  {/* Awal Username */}
                  <span className="font-semibold text-sm">
                    {data?.Author?.username}
                  </span>
                  {/* Akhir Username */}
                  {/* Awal Check Verfied */}
                  {data?.Author?.isVerified && (
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
            <div className="bg-purple-950/20 w-full h-[65%]">
              Caption Comment
            </div>
            {/* Awal Caption dan Comment */}

            {/* Awal Like dan Input Comment */}
            <div className="bg-pink-500/20 w-full h-[25%]">
              Like dan Input Comment
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
//     "id": 9,
//     "UserId": 5,
//     "imageUrl": "https://picsum.photos/600/600?random=9",
//     "caption": "Morning workout routine 💪 #fitness #workout",
//     "createdAt": "2026-02-06T08:40:13.912Z",
//     "updatedAt": "2026-02-06T08:40:13.912Z",
//     "deletedAt": null,
//     "Author": {
//         "id": 5,
//         "username": "ridho",
//         "avatar": "https://i.pravatar.cc/150?img=5"
//     },
//     "Comments": [
//         {
//             "id": 10,
//             "PostId": 9,
//             "UserId": 3,
//             "content": "Inspiring! 💪",
//             "createdAt": "2026-02-06T08:40:14.006Z",
//             "updatedAt": "2026-02-06T08:40:14.006Z",
//             "deletedAt": null
//         },
//         {
//             "id": 11,
//             "PostId": 9,
//             "UserId": 4,
//             "content": "What's your routine?",
//             "createdAt": "2026-02-06T08:40:14.006Z",
//             "updatedAt": "2026-02-06T08:40:14.006Z",
//             "deletedAt": null
//         }
//     ],
//     "Likes": [
//         {
//             "id": 18,
//             "PostId": 9,
//             "UserId": 2,
//             "createdAt": "2026-02-06T08:40:13.947Z",
//             "updatedAt": "2026-02-06T08:40:13.947Z",
//             "deletedAt": null
//         },
//         {
//             "id": 19,
//             "PostId": 9,
//             "UserId": 3,
//             "createdAt": "2026-02-06T08:40:13.947Z",
//             "updatedAt": "2026-02-06T08:40:13.947Z",
//             "deletedAt": null
//         },
//         {
//             "id": 20,
//             "PostId": 9,
//             "UserId": 4,
//             "createdAt": "2026-02-06T08:40:13.947Z",
//             "updatedAt": "2026-02-06T08:40:13.947Z",
//             "deletedAt": null
//         }
//     ]
// }
