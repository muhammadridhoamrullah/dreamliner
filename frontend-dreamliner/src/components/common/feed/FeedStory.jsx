import { useEffect, useRef, useState } from "react";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";

export default function FeedStory() {
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
    <div className="bg-pink-300 w-full h-28 flex justify-start items-center ">
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
        {[...Array(30)].map((_, index) => (
          <div
            key={index}
            className="min-w-20 h-20 shrink-0 bg-linear-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-full flex justify-center items-center text-white font-bold"
          >
            Story {index + 1}
          </div>
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
