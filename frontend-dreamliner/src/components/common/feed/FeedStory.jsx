import { useEffect, useRef, useState } from "react";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoryTray } from "../../../store/storySlice";
import StoryBubbleUser from "../story/StoryBubbleUser";
import toast from "react-hot-toast";

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
