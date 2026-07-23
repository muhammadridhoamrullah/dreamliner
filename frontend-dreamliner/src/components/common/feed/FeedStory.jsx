import { useEffect, useRef, useState } from "react";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoryTray } from "../../../store/storySlice";
import StoryBubbleUser from "../story/StoryBubbleUser";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function FeedStory() {
  const dispatch = useDispatch();
  const { loadingGetStoryTray, errorGetStoryTray, dataGetStoryTray } =
    useSelector((state) => state.story);

  const scrollRef = useRef(null);

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  //   useEffect untuk cek apakah scrollRef sudah terisi dan menambahkan event listener untuk scroll
  useEffect(() => {
    // Panggil checkScroll saat komponen pertama kali dimuat untuk menentukan apakah tombol panah kiri atau kanan harus ditampilkan
    checkScroll();

    const el = scrollRef.current;

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  // useEffect untuk fetch story tray
  useEffect(() => {
    console.log("Jalan");

    dispatch(fetchStoryTray());
  }, [dispatch]);

  // useEffect untuk handle error
  useEffect(() => {
    if (errorGetStoryTray) {
      toast.error(errorGetStoryTray);
    }
  }, [errorGetStoryTray]);

  //   Function checkScroll
  function checkScroll() {
    let el = scrollRef.current;

    if (!el) return;

    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  }

  //   Function scroll Next / Right
  function scrollRight() {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  }

  //   Function scroll Previous / Left
  function scrollLeft() {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  }

  // const dummyStories = Array.from({ length: 15 }, (_, i) => {
  //   const userId = i + 1;

  //   return {
  //     User: {
  //       id: userId,
  //       username: `user_${userId}`,
  //       avatar: `https://i.pravatar.cc/150?img=${userId}`,
  //       isVerified: userId % 3 === 0, // tiap 3 user verified
  //     },
  //     Stories: Array.from({ length: 2 }, (_, j) => ({
  //       id: userId * 10 + j,
  //       UserId: userId,
  //       mediaType: "image",
  //       mediaUrl: `https://picsum.photos/300/500?random=${userId}${j}`,
  //       caption: `Story ${j + 1} dari user ${userId}`,
  //       privacy: "public",
  //       allowReply: true,
  //       allowShare: true,
  //       expiresAt: new Date(Date.now() + 86400000).toISOString(), // +1 hari
  //       deletedAt: null,
  //       createdAt: new Date().toISOString(),
  //       updatedAt: new Date().toISOString(),
  //       User: {
  //         id: userId,
  //         username: `user_${userId}`,
  //         avatar: `https://i.pravatar.cc/150?img=${userId}`,
  //         isVerified: userId % 3 === 0,
  //       },
  //       Viewers: [],
  //       hasViewed: j % 2 === 0, // selang-seling viewed
  //     })),
  //   };
  // });
  return (
    <div className=" w-full h-32 flex justify-start items-center ">
      {/* Awal Button Scroll Prev */}
      <button
        onClick={scrollLeft}
        disabled={!showLeft}
        className={`w-10 h-full flex justify-center items-center ${showLeft ? "cursor-pointer" : "text-transparent cursor-default"} transition-all duration-500 ease-in-out`}
      >
        <IoIosArrowDropleft className="text-xl" />
      </button>
      {/* Akhir Button Scroll Prev */}

      {/* Awal Story Current User */}
      <div className=" w-24 h-28 flex flex-col justify-center items-center shrink-0 overflow-hidden">
        {/* Awal Profile Picture */}
        <Link
          onClick={() => toast.success("My Story Gweh")}
          className={`min-w-22 h-22 shrink-0 bg-linear-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-full relative overflow-hidden flex justify-center items-center `}
        >
          <img
            src={`https://i.pinimg.com/736x/4e/55/46/4e5546152db4a4eea4d1351980fb3367.jpg`}
            alt="Foto Profil Gweh"
            className="absolute w-20 h-20 object-cover rounded-full border-2 border-white"
          />
        </Link>
        {/* Akhir Profile Picture */}

        {/* Awal Username */}
        <span className="text-sm truncate w-full text-center">
          ridhoamrullah
        </span>
        {/* Akhir Username */}
      </div>
      {/* Akhir Story Current User */}

      {/* Awal Story */}
      <div
        ref={scrollRef}
        className="scrollbar-hide  w-full h-full flex justify-start items-center gap-4 overflow-x-auto scroll-smooth "
      >
        {dataGetStoryTray?.map((story, index) => (
          <StoryBubbleUser key={story.User.id} story={story} />
        ))}
      </div>
      {/* Akhir Story */}

      {/* Awal Button Scroll Next */}
      <button
        onClick={scrollRight}
        disabled={!showRight}
        className={`w-10 h-full flex justify-center items-center ${showRight ? "cursor-pointer" : "text-transparent cursor-default"} transition-all duration-500 ease-in-out`}
      >
        <IoIosArrowDropright className="text-xl" />
      </button>
      {/* Akhir Button Scroll Next */}
    </div>
  );
}

//  <Link
//         to={`/stories/${user.username}/${firstUnseenStory.id}`}
//         className={`min-w-22 h-22 shrink-0 ${notSeen ? "bg-linear-to-tr from-yellow-400 via-red-500 to-purple-600" : "bg-gray-300"} rounded-full  relative overflow-hidden flex justify-center items-center`}
//       >
//         <img
//           src={user.avatar}
//           alt={`Foto Profil ${user.username}`}
//           className="absolute w-20 h-20 object-cover rounded-full border-2 border-white"
//         />
//       </Link>

// [
//     {
//         "User": {
//             "id": 3,
//             "username": "charlie_dev",
//             "avatar": "https://i.pravatar.cc/150?img=3",
//             "isVerified": true
//         },
//         "Stories": [
//             {
//                 "id": 4,
//                 "UserId": 3,
//                 "mediaType": "image",
//                 "mediaUrl": "https://i.pinimg.com/736x/c2/41/9e/c2419e80d1fc5f4531522537c3025c14.jpg",
//                 "caption": "Charlie",
//                 "privacy": "public",
//                 "allowReply": true,
//                 "allowShare": true,
//                 "expiresAt": "2026-03-15T14:19:11.854Z",
//                 "deletedAt": null,
//                 "createdAt": "2026-03-14T14:19:11.844Z",
//                 "updatedAt": "2026-03-14T14:19:11.844Z",
//                 "User": {
//                     "id": 3,
//                     "username": "charlie_dev",
//                     "avatar": "https://i.pravatar.cc/150?img=3",
//                     "isVerified": true
//                 },
//                 "Viewers": [],
//                 "hasViewed": false
//             }
//         ]
//     },
//     {
//         "User": {
//             "id": 13,
//             "username": "leehyein",
//             "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//             "isVerified": true
//         },
//         "Stories": [
//             {
//                 "id": 3,
//                 "UserId": 13,
//                 "mediaType": "image",
//                 "mediaUrl": "https://i.pinimg.com/736x/c4/ca/5d/c4ca5d1e754ed0bc6f9a1419267d5429.jpg",
//                 "caption": "Lee Hyein ini",
//                 "privacy": "public",
//                 "allowReply": true,
//                 "allowShare": true,
//                 "expiresAt": "2026-03-15T09:19:19.452Z",
//                 "deletedAt": null,
//                 "createdAt": "2026-03-14T09:19:19.451Z",
//                 "updatedAt": "2026-03-14T09:19:19.451Z",
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
//                 "id": 2,
//                 "UserId": 13,
//                 "mediaType": "image",
//                 "mediaUrl": "https://i.pinimg.com/736x/c4/ca/5d/c4ca5d1e754ed0bc6f9a1419267d5429.jpg",
//                 "caption": "Lee Hyein ini",
//                 "privacy": "public",
//                 "allowReply": true,
//                 "allowShare": true,
//                 "expiresAt": "2026-03-15T08:24:03.417Z",
//                 "deletedAt": null,
//                 "createdAt": "2026-03-14T08:24:03.400Z",
//                 "updatedAt": "2026-03-14T08:24:03.400Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 1,
//                         "UserId": 3,
//                         "createdAt": "2026-03-15T07:02:11.432Z"
//                     }
//                 ],
//                 "hasViewed": false
//             },
//             {
//                 "id": 1,
//                 "UserId": 13,
//                 "mediaType": "image",
//                 "mediaUrl": "https://i.pinimg.com/736x/c4/ca/5d/c4ca5d1e754ed0bc6f9a1419267d5429.jpg",
//                 "caption": "wew",
//                 "privacy": "public",
//                 "allowReply": true,
//                 "allowShare": true,
//                 "expiresAt": "2026-03-15T08:14:01.873Z",
//                 "deletedAt": null,
//                 "createdAt": "2026-03-14T08:14:01.872Z",
//                 "updatedAt": "2026-03-14T08:14:01.872Z",
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
//     }
// ]
