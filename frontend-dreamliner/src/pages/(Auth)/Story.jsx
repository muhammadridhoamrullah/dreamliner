import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import StoryProgressBar from "../../components/common/story/StoryProgressBar";
import { useEffect, useRef, useState } from "react";
import StoryMedia from "../../components/common/story/StoryMedia";
import StoryHeader from "../../components/common/story/StoryHeader";

export default function Story() {
  const stories = useLoaderData();
  console.log("Stories", stories);
  const { username, StoryId } = useParams();
  const navigate = useNavigate();

  // Mencari index story yang sedang ditampilkan berdasarkan StoryId
  const initialIndex = stories.findIndex(
    (story) => story.id === parseInt(StoryId),
  );
  console.log("Initial Index", initialIndex);
  // Initial Index 0
  const [currentIndex, setCurrentIndex] = useState(
    initialIndex >= 0 ? initialIndex : 0,
  );
  console.log("Current Index", currentIndex);
  // Current Index 0

  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Story yang sedang ditampilkan
  const story = stories[currentIndex];
  const intervalRef = useRef(null);
  const elapsedRef = useRef(0);

  const DURATION = 5000; // Durasi setiap story dalam milidetik

  // Saat index berubah, update URL supaya bisa dishare/direfresh
  useEffect(() => {
    if (stories[currentIndex]) {
      navigate(`/stories/${username}/${stories[currentIndex].id}`, {
        replace: true,
      });
    }
  }, currentIndex);

  // Timer untuk auto-advance story
  useEffect(() => {
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
        goNext();
      } else {
        elapsedRef.current = elapsed;
      }
    }, 30);

    return () => clearInterval(intervalRef.current);
  }, [isPaused, currentIndex]);

  // Function untuk pause/resume
  function togglePause() {
    setIsPaused((prev) => !prev);
  }

  function goNext() {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
      elapsedRef.current = 0;
    } else {
      navigate(-1);
    }
  }

  function goPrev() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setProgress(0);
      elapsedRef.current = 0;
    }
  }

  if (!story) return null;

  return (
    <div className="bg-black w-full min-h-screen flex justify-center items-center text-white fixed inset-0 z-50">
      {/* Awal */}
      <div className="w-full min-h-screen flex justify-between items-start">
        {/* Awal Logo Instagram */}
        <div className=" flex-1 h-14 relative overflow-hidden flex justify-start">
          <img
            src={`/assets/images/instagram-text.png`}
            alt="Logo Instagram"
            className="absolute left-2 h-full object-contain"
          />
        </div>
        {/* Akhir Logo Instagram */}

        {/* Awal Story */}
        <div className="bg-black flex-1 relative w-full h-screen overflow-hidden ">
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

        {/* Awal Button Close */}
        <div className=" flex-1 w-full h-full flex justify-end p-4">
          <IoMdClose
            onClick={() => navigate(-1)}
            className="text-4xl cursor-pointer hover:scale-105"
          />
        </div>
        {/* Akhir Button Close */}
      </div>
      {/* Akhir */}
    </div>
  );
}

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
