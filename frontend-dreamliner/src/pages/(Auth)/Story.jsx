import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import StoryProgressBar from "../../components/common/story/StoryProgressBar";
import { useEffect, useRef, useState } from "react";
import StoryMedia from "../../components/common/story/StoryMedia";
import StoryHeader from "../../components/common/story/StoryHeader";
import { useDispatch, useSelector } from "react-redux";
import { viewStory } from "../../store/storySlice";
import StoryThumbnailPrevNextUser from "../../components/common/story/StoryThumbnailPrevNextUser";

export default function Story() {
  const dispatch = useDispatch();
  const stories = useLoaderData();

  const { dataGetStoryTray } = useSelector((state) => state.story);
  console.log("dataStoryTray di Story.jsx", dataGetStoryTray);

  const { username, StoryId } = useParams();
  const navigate = useNavigate();

  // Mencari index story yang sedang ditampilkan berdasarkan StoryId
  const initialIndex = stories.findIndex(
    (story) => story.id === parseInt(StoryId),
  );

  // Story di index keberapa yang tampil, default ke 0 (story pertama) kalau StoryId tidak ditemukan
  // State untuk progress bar dan pause, 0 sampai 100 untuk progress
  // Apakah story sedang dipause (misal karena user menekan tombol pause di desktop)
  const [currentIndex, setCurrentIndex] = useState();

  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  // Ketiganya saling berhubungan, saat currentIndex berubah maka progress harus direset ke 0 dan timer harus direset, saat isPaused true maka timer harus berhenti, dst

  // Story yang sedang ditampilkan berdasarkan currentIndex
  const story = stories[currentIndex];

  const [timerKey, setTimerKey] = useState(0); // State untuk menyimpan key timer

  // Interval refs untuk menyimpan ID dari setInterval supaya bisa di-clear saat component unmount atau saat timer direset
  // elapsedRef untuk menyimpan berapa lama timer sudah berjalan saat ini, supaya saat pause lalu resume bisa melanjutkan dari progress yang sudah dicapai, bukan mulai dari 0 lagi
  const intervalRef = useRef(null);
  const elapsedRef = useRef(0);
  useEffect(() => {
    const newIndex = stories.findIndex(
      (story) => story.id === parseInt(StoryId),
    );
    setCurrentIndex(newIndex >= 0 ? newIndex : 0);
    setProgress(0);
    elapsedRef.current = 0;
  }, [username]);

  const DURATION = 5000; // Durasi setiap story dalam milidetik

  const goNextRef = useRef(null);

  // Cari posisi index user di story yang sedang dibuka di tray
  const currentUserTrayIndex = dataGetStoryTray?.findIndex(
    (el) => el.User.username === username,
  );
  console.log("currentUserTrayIndex", currentUserTrayIndex);
  // currentUserTrayIndex 1

  // Ambil data prev dan next user di tray berdasarkan currentUserTrayIndex
  let prevUserStory = dataGetStoryTray?.[currentUserTrayIndex - 1] || null;
  console.log("prev", prevUserStory);

  let nextUserStory = dataGetStoryTray?.[currentUserTrayIndex + 1] || null;
  console.log("next", nextUserStory);

  // useEffect untuk menandai story tersebut sudah di mark sebagai viewed berdasarkan StoryId
  useEffect(() => {
    if (StoryId) {
      // Panggil action untuk mark story as viewed
      dispatch(viewStory(StoryId));
    }
  }, [StoryId, dispatch]);

  // Saat index berubah, update URL supaya bisa dishare/direfresh
  useEffect(() => {
    if (stories[currentIndex]) {
      navigate(`/stories/${username}/${stories[currentIndex].id}`, {
        replace: true,
      });
    }
  }, [currentIndex, navigate, username, stories]);

  // Timer untuk auto-advance story
  useEffect(() => {
    // Jika sedang dipause, jangan buat timer
    if (isPaused) {
      clearInterval(intervalRef.current);
      return;
    }

    const startTime = Date.now() - elapsedRef.current;

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;

      const pct = Math.min((elapsed / DURATION) * 100, 100);

      setProgress(pct);

      if (elapsed >= DURATION) {
        clearInterval(intervalRef.current);
        elapsedRef.current = 0;
        goNextRef.current();
      } else {
        elapsedRef.current = elapsed;
      }
    }, 30);

    return () => clearInterval(intervalRef.current);
  }, [isPaused, currentIndex, timerKey]);

  // Function untuk pause/resume
  function togglePause() {
    setIsPaused((prev) => !prev);
  }

  function goNext() {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
      elapsedRef.current = 0;
    } else if (nextUserStory) {
      goToNextUserStory();
    } else {
      navigate("/");
    }
  }

  goNextRef.current = goNext;

  function goPrev() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setProgress(0);
      elapsedRef.current = 0;
    } else if (prevUserStory) {
      goToPrevUserStory();
    } else {
      setCurrentIndex(0);
      setProgress(0);
      elapsedRef.current = 0;
      setTimerKey((prev) => prev + 1); // Reset timer dengan mengubah key, sehingga useEffect timer akan jalan lagi dari awal
    }
  }

  // Function story prev
  function goToPrevUserStory() {
    if (!prevUserStory) return;

    const prevUser = prevUserStory.User;
    const prevStory = prevUserStory.Stories;

    const targetStory =
      prevStory.find((story) => !story.hasViewed) || prevStory[0];

    navigate(`/stories/${prevUser.username}/${targetStory.id}`);
  }

  // Function story next
  function goToNextUserStory() {
    if (!nextUserStory) return;
    const nextUser = nextUserStory.User;
    const nextStory = nextUserStory.Stories;
    const targetStory =
      nextStory.find((story) => !story.hasViewed) || nextStory[0];
    navigate(`/stories/${nextUser.username}/${targetStory.id}`);
  }

  if (!story) return null;

  return (
    <div className="bg-black w-full min-h-screen flex justify-between items-start text-white fixed inset-0 z-50 ">
      {/* Awal Logo Instagram */}
      <div className=" flex-1 w-full h-14 relative overflow-hidden flex justify-start">
        <img
          src={`/assets/images/instagram-text.png`}
          alt="Logo Instagram"
          className="absolute left-1 h-full object-contain"
        />
      </div>
      {/* Akhir Logo Instagram */}

      {/* Awal Prev Another User Story */}
      <button
        disabled={!prevUserStory}
        className={`${prevUserStory ? "cursor-pointer" : "cursor-default"} flex-2 w-full h-screen flex justify-center items-center`}
      >
        {prevUserStory && (
          <StoryThumbnailPrevNextUser
            tray={prevUserStory}
            onClick={goToPrevUserStory}
          />
        )}
      </button>
      {/* Akhir Prev Another User Story */}

      {/* Awal Story */}
      <div className="bg-black flex-3 relative w-full h-screen overflow-hidden">
        {/* Awal Bagian 1: Progress Bar */}
        <StoryProgressBar
          total={stories.length}
          current={currentIndex}
          progress={progress}
        />
        {/* Akhir Bagian 1: Progress Bar */}

        {/* Awal Bagian 2: Story Media (Gambar/Video) */}
        <StoryMedia story={story} />
        {/* Akhir Bagian 2: Story Media (Gambar/Video) */}

        {/* Awal Bagian 3: Header (Avatar+Nama) */}
        <StoryHeader
          user={story.User}
          time={story.createdAt}
          togglePause={togglePause}
          isPaused={isPaused}
        />
        {/* Akhir Bagian 3: Header (Avatar+Nama) */}

        {/* Awal Bagian 4: Navigasi Klik Kanan Kiri */}
        <div className="absolute inset-0 z-10 flex">
          <div className="flex-1 cursor-pointer" onClick={goPrev} />
          <div className="flex-1 cursor-pointer" onClick={goNext} />
        </div>
        {/* Akhir Bagian 4: Navigasi Klik Kanan Kiri */}
      </div>
      {/* Akhir Story */}

      {/* Awal Next Another User Story */}
      <button
        className={`${nextUserStory ? "cursor-pointer" : "cursor-default"} flex-2 w-full h-screen flex justify-center items-center`}
      >
        {nextUserStory && (
          <StoryThumbnailPrevNextUser
            tray={nextUserStory}
            onClick={goToNextUserStory}
          />
        )}
      </button>
      {/* Akhir Next Another User Story */}

      {/* Awal Button Close */}
      <div className=" flex-1 w-full h-full flex justify-end p-4">
        <IoMdClose
          onClick={() => navigate("/")}
          className="text-4xl cursor-pointer hover:scale-105"
        />
      </div>
      {/* Akhir Button Close */}
    </div>
  );
}

// [
//     {
//         "User": {
//             "id": 13,
//             "username": "leehyein",
//             "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//             "isVerified": true
//         },
//         "Stories": [
//             {
//                 "id": 28,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:08:18.619Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 17,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T07:10:30.263Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 29,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:08:36.779Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 18,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T07:10:53.973Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 30,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:08:48.223Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 21,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T07:27:16.960Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 31,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:09:01.603Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 22,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T07:27:19.685Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 32,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:09:12.529Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 23,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T07:27:22.181Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 33,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:51:25.980Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 29,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T07:51:45.317Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 34,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:51:33.817Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 30,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T07:52:11.066Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 35,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T08:00:58.295Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 31,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T08:02:15.631Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 36,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T08:01:11.275Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 32,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T08:02:24.844Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 37,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T08:01:21.405Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 33,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T08:02:31.222Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 38,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T08:01:32.975Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 34,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T08:02:36.272Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 39,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T08:07:16.363Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 35,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T08:11:12.253Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             }
//         ],
//         "hasUnSeen": false,
//         "latestCreatedAt": "2026-03-18T08:07:16.363Z"
//     },
//     {
//         "User": {
//             "id": 15,
//             "username": "kimminji",
//             "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//             "isVerified": true
//         },
//         "Stories": [
//             {
//                 "id": 21,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:05:35.818Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 19,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T07:11:01.951Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 22,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:06:01.917Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 20,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T07:11:22.419Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 23,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:06:11.865Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 24,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T07:45:21.389Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 24,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:06:23.272Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 25,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T07:45:32.052Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 25,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:06:35.247Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 26,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T07:45:34.230Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 26,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:06:50.392Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 27,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T07:45:36.430Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 27,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:07:02.415Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 28,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T07:45:38.092Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             }
//         ],
//         "hasUnSeen": false,
//         "latestCreatedAt": "2026-03-18T07:07:02.415Z"
//     }
// ]

// dataStoryTray ketika hyein
// [
//     {
//         "User": {
//             "id": 13,
//             "username": "leehyein",
//             "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//             "isVerified": true
//         },
//         "Stories": [
//             {
//                 "id": 28,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:08:18.619Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 17,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T07:10:30.263Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 29,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:08:36.779Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 18,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T07:10:53.973Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 30,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:08:48.223Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 21,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T07:27:16.960Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 31,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:09:01.603Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 22,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T07:27:19.685Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 32,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:09:12.529Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 23,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T07:27:22.181Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 33,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:51:25.980Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 29,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T07:51:45.317Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 34,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:51:33.817Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 30,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T07:52:11.066Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 35,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T08:00:58.295Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 31,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T08:02:15.631Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 36,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T08:01:11.275Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 32,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T08:02:24.844Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 37,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T08:01:21.405Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 33,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T08:02:31.222Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 38,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T08:01:32.975Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 34,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T08:02:36.272Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 39,
//                 "UserId": 13,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T08:07:16.363Z",
//                 "User": {
//                     "id": 13,
//                     "username": "leehyein",
//                     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 35,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T08:11:12.253Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             }
//         ],
//         "hasUnSeen": false,
//         "latestCreatedAt": "2026-03-18T08:07:16.363Z"
//     },
//     {
//         "User": {
//             "id": 15,
//             "username": "kimminji",
//             "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//             "isVerified": true
//         },
//         "Stories": [
//             {
//                 "id": 21,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:05:35.818Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 19,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T07:11:01.951Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 22,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:06:01.917Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 20,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T07:11:22.419Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 23,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:06:11.865Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 24,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T07:45:21.389Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 24,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:06:23.272Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 25,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T07:45:32.052Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 25,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:06:35.247Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 26,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T07:45:34.230Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 26,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:06:50.392Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 27,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T07:45:36.430Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             },
//             {
//                 "id": 27,
//                 "UserId": 15,
//                 "deletedAt": null,
//                 "createdAt": "2026-03-18T07:07:02.415Z",
//                 "User": {
//                     "id": 15,
//                     "username": "kimminji",
//                     "avatar": "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/minji-newjeans-elle-january-2025-nolae-132766.webp?v=1736330024",
//                     "isVerified": true
//                 },
//                 "Viewers": [
//                     {
//                         "id": 28,
//                         "UserId": 5,
//                         "createdAt": "2026-03-18T07:45:38.092Z",
//                         "Viewer": {
//                             "id": 5
//                         }
//                     }
//                 ],
//                 "hasViewed": true
//             }
//         ],
//         "hasUnSeen": false,
//         "latestCreatedAt": "2026-03-18T07:07:02.415Z"
//     }
// ]

// [
//     {
//         "id": 10,
//         "UserId": 13,
//         "mediaType": "image",
//         "mediaUrl": "https://i.pinimg.com/736x/06/ea/1a/06ea1aaa289e1a573dabff2c0607e6fb.jpg",
//         "caption": null,
//         "privacy": "public",
//         "allowReply": true,
//         "allowShare": true,
//         "expiresAt": "2026-03-17T13:32:39.917Z",
//         "deletedAt": null,
//         "createdAt": "2026-03-16T13:32:39.916Z",
//         "updatedAt": "2026-03-16T13:32:39.916Z",
//         "User": {
//             "id": 13,
//             "username": "leehyein",
//             "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//             "isVerified": true
//         },
//         "Viewers": [
//             {
//                 "id": 5,
//                 "UserId": 5,
//                 "createdAt": "2026-03-17T07:25:48.526Z",
//                 "Viewer": {
//                     "id": 5,
//                     "username": "ridho",
//                     "avatar": "https://i.pravatar.cc/150?img=5",
//                     "isVerified": true
//                 }
//             }
//         ],
//         "Replies": [],
//         "hasViewed": true
//     },
//     {
//         "id": 9,
//         "UserId": 13,
//         "mediaType": "image",
//         "mediaUrl": "https://i.pinimg.com/736x/26/c2/ee/26c2eeb065f7e3d1f709071971940359.jpg",
//         "caption": null,
//         "privacy": "public",
//         "allowReply": true,
//         "allowShare": true,
//         "expiresAt": "2026-03-17T13:32:05.800Z",
//         "deletedAt": null,
//         "createdAt": "2026-03-16T13:32:05.785Z",
//         "updatedAt": "2026-03-16T13:32:05.785Z",
//         "User": {
//             "id": 13,
//             "username": "leehyein",
//             "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//             "isVerified": true
//         },
//         "Viewers": [
//             {
//                 "id": 6,
//                 "UserId": 5,
//                 "createdAt": "2026-03-17T07:25:52.413Z",
//                 "Viewer": {
//                     "id": 5,
//                     "username": "ridho",
//                     "avatar": "https://i.pravatar.cc/150?img=5",
//                     "isVerified": true
//                 }
//             }
//         ],
//         "Replies": [],
//         "hasViewed": true
//     },
//     {
//         "id": 13,
//         "UserId": 13,
//         "mediaType": "image",
//         "mediaUrl": "https://i.pinimg.com/736x/29/c0/4a/29c04a9f9771545b55ee17500c968433.jpg",
//         "caption": null,
//         "privacy": "public",
//         "allowReply": true,
//         "allowShare": true,
//         "expiresAt": "2026-03-18T07:53:17.324Z",
//         "deletedAt": null,
//         "createdAt": "2026-03-17T07:53:17.323Z",
//         "updatedAt": "2026-03-17T07:53:17.323Z",
//         "User": {
//             "id": 13,
//             "username": "leehyein",
//             "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//             "isVerified": true
//         },
//         "Viewers": [
//             {
//                 "id": 13,
//                 "UserId": 5,
//                 "createdAt": "2026-03-17T07:56:19.661Z",
//                 "Viewer": {
//                     "id": 5,
//                     "username": "ridho",
//                     "avatar": "https://i.pravatar.cc/150?img=5",
//                     "isVerified": true
//                 }
//             }
//         ],
//         "Replies": [],
//         "hasViewed": true
//     },
//     {
//         "id": 12,
//         "UserId": 13,
//         "mediaType": "image",
//         "mediaUrl": "https://i.pinimg.com/736x/c7/3f/55/c73f55b42997538f005a8a8cdc999a85.jpg",
//         "caption": null,
//         "privacy": "public",
//         "allowReply": true,
//         "allowShare": true,
//         "expiresAt": "2026-03-18T07:52:40.680Z",
//         "deletedAt": null,
//         "createdAt": "2026-03-17T07:52:40.678Z",
//         "updatedAt": "2026-03-17T07:52:40.678Z",
//         "User": {
//             "id": 13,
//             "username": "leehyein",
//             "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//             "isVerified": true
//         },
//         "Viewers": [
//             {
//                 "id": 14,
//                 "UserId": 5,
//                 "createdAt": "2026-03-17T07:56:53.857Z",
//                 "Viewer": {
//                     "id": 5,
//                     "username": "ridho",
//                     "avatar": "https://i.pravatar.cc/150?img=5",
//                     "isVerified": true
//                 }
//             }
//         ],
//         "Replies": [],
//         "hasViewed": true
//     },
//     {
//         "id": 11,
//         "UserId": 13,
//         "mediaType": "image",
//         "mediaUrl": "https://i.pinimg.com/736x/fc/05/bb/fc05bb99589fc8ce045d84d5673ebcdc.jpg",
//         "caption": null,
//         "privacy": "public",
//         "allowReply": true,
//         "allowShare": true,
//         "expiresAt": "2026-03-18T07:52:22.268Z",
//         "deletedAt": null,
//         "createdAt": "2026-03-17T07:52:22.266Z",
//         "updatedAt": "2026-03-17T07:52:22.266Z",
//         "User": {
//             "id": 13,
//             "username": "leehyein",
//             "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//             "isVerified": true
//         },
//         "Viewers": [
//             {
//                 "id": 15,
//                 "UserId": 5,
//                 "createdAt": "2026-03-17T07:56:57.692Z",
//                 "Viewer": {
//                     "id": 5,
//                     "username": "ridho",
//                     "avatar": "https://i.pravatar.cc/150?img=5",
//                     "isVerified": true
//                 }
//             }
//         ],
//         "Replies": [],
//         "hasViewed": true
//     }
// ]

// [
//     {
//         "id": 10,
//         "UserId": 13,
//         "mediaType": "image",
//         "mediaUrl": "https://i.pinimg.com/736x/06/ea/1a/06ea1aaa289e1a573dabff2c0607e6fb.jpg",
//         "caption": null,
//         "privacy": "public",
//         "allowReply": true,
//         "allowShare": true,
//         "expiresAt": "2026-03-17T13:32:39.917Z",
//         "deletedAt": null,
//         "createdAt": "2026-03-16T13:32:39.916Z",
//         "updatedAt": "2026-03-16T13:32:39.916Z",
//         "User": {
//             "id": 13,
//             "username": "leehyein",
//             "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//             "isVerified": true
//         },
//         "Viewers": [],
//         "Replies": [],
//         "hasViewed": false
//     },
//     {
//         "id": 9,
//         "UserId": 13,
//         "mediaType": "image",
//         "mediaUrl": "https://i.pinimg.com/736x/26/c2/ee/26c2eeb065f7e3d1f709071971940359.jpg",
//         "caption": null,
//         "privacy": "public",
//         "allowReply": true,
//         "allowShare": true,
//         "expiresAt": "2026-03-17T13:32:05.800Z",
//         "deletedAt": null,
//         "createdAt": "2026-03-16T13:32:05.785Z",
//         "updatedAt": "2026-03-16T13:32:05.785Z",
//         "User": {
//             "id": 13,
//             "username": "leehyein",
//             "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//             "isVerified": true
//         },
//         "Viewers": [],
//         "Replies": [],
//         "hasViewed": false
//     }
// ]
