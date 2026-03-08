import { useState } from "react";
import { BsCamera } from "react-icons/bs";
import { PiDotsNineBold, PiDotsNineFill } from "react-icons/pi";
import ProfileFeeds from "./ProfileFeeds";

export default function ProfileContent({ dataFindUser }) {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <>
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
              <ProfileFeeds data={dataFindUser} />
            )}
          </div>

          {/* Akhir Render Sesuai Menu */}
        </div>
      )}
    </>
  );
}
